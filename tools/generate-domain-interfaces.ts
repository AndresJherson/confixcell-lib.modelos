import {
  ClassDeclaration,
  HeritageClause,
  InterfaceDeclaration,
  Project,
  PropertyDeclaration,
  GetAccessorDeclaration,
  SetAccessorDeclaration,
  StructureKind,
  SyntaxKind,
  Type,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";

const project = new Project({ tsConfigFilePath: "tsconfig.json" });

// Archivo raíz que reexporta todo tu dominio
const ENTRY = "src/index.ts";
const OUT_DIR = "docs";
const OUT_FILE = path.join(OUT_DIR, "domain-interfaces.d.ts");

// Heurística opcional para resolver colisiones de tipos con el mismo nombre de propiedad
function preferType(a: string, b: string): string {
  // prioridad: MetadataPresetRecord > MetadataPresetSchema
  const score = (t: string) =>
    (/\bMetadataPresetRecord\b/.test(t) ? 10 : 0) +
    (/\bMetadataPresetSchema\b/.test(t) ? 5 : 0);

  if (a === b) return a;
  const sa = score(a);
  const sb = score(b);
  if (sa !== sb) return sa > sb ? a : b;

  // Normaliza String -> string
  const na = a.replace(/\bString\b/g, "string");
  const nb = b.replace(/\bString\b/g, "string");
  if (na === nb) return na;

  // último recurso: une en unión (pero deduplica miembros)
  const parts = new Set([...na.split("|"), ...nb.split("|")].map(s => s.trim()));
  return Array.from(parts).join(" | ");
}

// Limpia el texto de tipo: quita import("...").X y normaliza primitivos
function sanitizeTypeText(t: string): string {
  return t
    .replace(/import\("[^"]+"\)\./g, "") // fuera rutas absolutas
    .replace(/\bString\b/g, "string")
    .replace(/\bNumber\b/g, "number")
    .replace(/\bBoolean\b/g, "boolean")
    .replace(/\bundefined \| null\b/g, "null | undefined") // estética
    .replace(/\s+/g, " ")
    .trim();
}

const sf = project.addSourceFileAtPath(ENTRY);
const emitted = new Set<string>(); // nombres ya emitidos (interfaces)
const pendingLines: string[] = [];

// Encabezado: declaraciones ambiente sin imports para libs comunes
pendingLines.push(`// ---- Ambient externals (sin imports) ----`);
pendingLines.push(`declare class Decimal { /* placeholder */ }`);
pendingLines.push(`declare namespace luxon { class DateTime<T = unknown> {} }`);
pendingLines.push(``);
pendingLines.push(`// ---- Dominio ----`);

// Emite primero bases/implementadas (para que existan si extiendes)
function ensureEmitForHeritage(heritage: HeritageClause[]) {
  for (const h of heritage) {
    for (const tn of h.getTypeNodes()) {
      const type = tn.getType();
      const sym = type.getSymbol();
      if (!sym) continue;
      for (const d of sym.getDeclarations()) {
        if (d.getKind() === SyntaxKind.ClassDeclaration) {
          emitClassInterface(d as ClassDeclaration);
        } else if (d.getKind() === SyntaxKind.InterfaceDeclaration) {
          emitInterfaceFromInterface(d as InterfaceDeclaration);
        }
      }
    }
  }
}

function typeTextAt(node: any, t: Type): string {
  const raw = t.getText(node);
  return sanitizeTypeText(raw);
}

// Solo miembros **declarados en la clase** (no heredados) para evitar duplicados con `extends`
function collectOwnProps(clazz: ClassDeclaration) {
  // prioridad: property > getter > setter
  const orderScore = (k: "prop" | "get" | "set") => (k === "prop" ? 3 : k === "get" ? 2 : 1);
  const map = new Map<string, { type: string; source: "prop" | "get" | "set"; optional: boolean }>();

  // propiedades declaradas
  clazz.getProperties().forEach((p: PropertyDeclaration) => {
    const name = p.getName();
    const t = typeTextAt(p, p.getType());
    const val = { type: t, source: "prop" as const, optional: !!p.hasQuestionToken() };
    const prev = map.get(name);
    if (!prev || orderScore("prop") >= orderScore(prev.source)) map.set(name, val);
  });

  // getters
  clazz.getGetAccessors().forEach((g: GetAccessorDeclaration) => {
    const name = g.getName();
    const t = typeTextAt(g, g.getReturnType());
    const val = { type: t, source: "get" as const, optional: false };
    const prev = map.get(name);
    if (!prev) map.set(name, val);
    else {
      // resolver conflicto
      const chosen =
        orderScore("get") > orderScore(prev.source)
          ? t
          : preferType(prev.type, t);
      map.set(name, { type: chosen, source: prev.source, optional: prev.optional });
    }
  });

  // setters (si difiere del getter/prop, se resuelve)
  clazz.getSetAccessors().forEach((s: SetAccessorDeclaration) => {
    const name = s.getName();
    const param = s.getParameters()[0];
    if (!param) return;
    const t = typeTextAt(s, param.getType());
    const val = { type: t, source: "set" as const, optional: false };
    const prev = map.get(name);
    if (!prev) map.set(name, val);
    else {
      const chosen = preferType(prev.type, t);
      map.set(name, { type: chosen, source: prev.source, optional: prev.optional });
    }
  });

  return Array.from(map.entries()).map(([name, v]) => ({
    name,
    type: v.type,
    optional: v.optional,
  }));
}

function friendlyHeritageText(heritage: HeritageClause[]): string[] {
  // devuelve nombres limpios (sin import("...").), p. ej. BaseDocumento, Auditable
  const out: string[] = [];
  for (const h of heritage) {
    for (const tn of h.getTypeNodes()) {
      out.push(sanitizeTypeText(tn.getText()));
    }
  }
  return out;
}

function emitInterfaceFromInterface(intf: InterfaceDeclaration) {
  const name = intf.getName();
  if (!name || emitted.has(name)) return;
  emitted.add(name);

  // procesar sus bases
  ensureEmitForHeritage(intf.getHeritageClauses());

  // Solo miembros tipo propiedad (ignorar métodos)
  const members = intf.getMembers().filter(m => {
    const k = m.getKind();
    return (
      k === SyntaxKind.PropertySignature ||
      k === SyntaxKind.GetAccessor ||
      k === SyntaxKind.SetAccessor
    );
  });

  // deduplicación por nombre dentro de la propia interfaz implementada
  const byName = new Map<string, { type: string; optional: boolean }>();
  for (const m of members) {
    const k = m.getKind();
    const name = (m as any).getName?.();
    if (!name) continue;

    let t: string;
    let optional = false;

    if (k === SyntaxKind.PropertySignature) {
      t = typeTextAt(m, (m as any).getType());
      optional = !!(m as any).hasQuestionToken?.();
    } else if (k === SyntaxKind.GetAccessor) {
      t = typeTextAt(m, (m as any).getReturnType());
    } else {
      const p0 = (m as any).getParameters?.()[0];
      if (!p0) continue;
      t = typeTextAt(m, p0.getType());
    }

    t = sanitizeTypeText(t);
    const prev = byName.get(name);
    byName.set(name, !prev ? { type: t, optional } : { type: preferType(prev.type, t), optional: prev.optional || optional });
  }

  const extendsTxt = friendlyHeritageText(intf.getHeritageClauses());
  const header = `export interface ${name}${extendsTxt.length ? " extends " + extendsTxt.join(", ") : ""} {`;
  pendingLines.push(header);
  for (const [n, v] of byName.entries()) {
    pendingLines.push(`  ${n}${v.optional ? "?" : ""}: ${v.type};`);
  }
  pendingLines.push(`}`);
  pendingLines.push("");
}

function emitClassInterface(clazz: ClassDeclaration) {
  const name = clazz.getName();
  if (!name || emitted.has(name)) return;
  emitted.add(name);

  const heritage = clazz.getHeritageClauses();

  // Asegura que bases/implementadas existan antes
  ensureEmitForHeritage(heritage);

  // Solo miembros PROPIOS (no heredados) → evitar duplicados con extends
  const props = collectOwnProps(clazz);

  const extendsTxt = friendlyHeritageText(heritage);
  const header = `export interface ${name}${extendsTxt.length ? " extends " + extendsTxt.join(", ") : ""} {`;
  pendingLines.push(header);
  for (const p of props) {
    pendingLines.push(`  ${p.name}${p.optional ? "?" : ""}: ${p.type};`);
  }
  pendingLines.push(`}`);
  pendingLines.push("");
}

// Recorre todo lo exportado por tu entry
sf.getExportedDeclarations().forEach(decls => {
  for (const d of decls) {
    if (d.getKind() === SyntaxKind.ClassDeclaration) {
      emitClassInterface(d as ClassDeclaration);
    } else if (d.getKind() === SyntaxKind.InterfaceDeclaration) {
      // también emitimos interfaces exportadas (filtrando métodos)
      emitInterfaceFromInterface(d as InterfaceDeclaration);
    }
  }
});

// Salida
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, pendingLines.join("\n"), "utf8");
console.log(`✅ Generado: ${OUT_FILE}`);
