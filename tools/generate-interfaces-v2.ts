// scripts/generate-interfaces.ts
import { Project, StructureKind, InterfaceDeclarationStructure, PropertySignatureStructure, MethodSignatureStructure } from "ts-morph";
import * as path from "path";

async function main() {
    const project = new Project( {
        tsConfigFilePath: path.resolve( "tsconfig.json" ),
    } );

    const indexFile = project.getSourceFileOrThrow( "src/index.ts" );

    const exports = indexFile.getExportedDeclarations();

    const interfaces: InterfaceDeclarationStructure[] = [];

    for ( const [name, declarations] of exports ) {
        for ( const decl of declarations ) {
            if ( decl.getKindName() === "ClassDeclaration" || decl.getKindName() === "InterfaceDeclaration" ) {
                const properties: PropertySignatureStructure[] = [];
                const methods: MethodSignatureStructure[] = [];

                // === PROPIEDADES ===
                for ( const prop of ( decl as any ).getProperties?.() ?? [] ) {
                    properties.push( {
                        kind: StructureKind.PropertySignature,
                        name: prop.getName(),
                        type: prop.getType().getText(),
                        hasQuestionToken: prop.hasQuestionToken?.() ?? false,
                    } );
                }

                // === MÉTODOS ===
                for ( const method of ( decl as any ).getMethods?.() ?? [] ) {
                    methods.push( {
                        kind: StructureKind.MethodSignature,
                        name: method.getName(),
                        parameters: method.getParameters().map( ( p: any ) => ( {
                            name: p.getName(),
                            type: p.getType().getText(),
                        } ) ),
                        returnType: method.getReturnType().getText(),
                    } );
                }

                // === EXTENDS / IMPLEMENTS ===
                const heritageClauses = ( decl as any ).getHeritageClauses?.() ?? [];
                const extendsTypes = heritageClauses.flatMap( ( h: any ) =>
                    h.getTypeNodes().map( ( t: any ) => t.getText() )
                );

                interfaces.push( {
                    kind: StructureKind.Interface,
                    name: `I${name}`,
                    extends: extendsTypes.length > 0 ? extendsTypes : undefined,
                    properties,
                    methods,
                    isExported: true,
                } );
            }
        }
    }

    const outFile = project.createSourceFile(
        "src/interfaces/generated-interfaces.ts",
        { statements: interfaces },
        { overwrite: true }
    );

    await outFile.save();
    console.log( "✅ Archivo generated-interfaces.ts creado." );
}

main().catch( console.error );
