// tools/replace-class-type-ast.ts
import path from "path";
import fs from "fs";
import { Project, Scope, SyntaxKind } from "ts-morph";

const baseDirArg = process.argv[2];
const baseDir = baseDirArg ? path.resolve( process.cwd(), baseDirArg ) : path.resolve( __dirname, "../src" );
const apply = process.argv.includes( "--apply" ); // si no, dry-run

if ( !fs.existsSync( baseDir ) ) {
    console.error( "Directorio no encontrado:", baseDir );
    process.exit( 1 );
}

// Crear proyecto ts-morph
const tsconfigPath = path.join( process.cwd(), "tsconfig.json" );
const project = new Project( {
    tsConfigFilePath: fs.existsSync( tsconfigPath ) ? tsconfigPath : undefined,
    skipAddingFilesFromTsConfig: true,
} );

function walkDir( dir: string ): string[] {
    const out: string[] = [];
    for ( const ent of fs.readdirSync( dir, { withFileTypes: true } ) ) {
        const full = path.join( dir, ent.name );
        if ( ent.isDirectory() ) {
            if ( ["node_modules", "dist", "build"].includes( ent.name ) ) continue;
            out.push( ...walkDir( full ) );
        } else if ( ent.isFile() && full.endsWith( ".ts" ) ) {
            out.push( full );
        }
    }
    return out;
}

const files = walkDir( baseDir );
let changedFiles = 0;

for ( const filePath of files ) {
    const sf = project.addSourceFileAtPath( filePath );
    let fileWillChange = false;

    for ( const cls of sf.getClasses() ) {
        const hasPropClass = cls.getDecorators().some( d => d.getText().startsWith( "@Prop.Class" ) );
        if ( !hasPropClass ) continue;

        const className = cls.getName();
        if ( !className ) continue;

        // 1️⃣ Ajustar propiedad no estática 'type'
        const typeProp = cls.getProperties().find( p => !p.isStatic() && p.getName() === "type" );
        if ( typeProp ) {
            if ( typeProp.getTypeNode() ) typeProp.removeType();
            typeProp.setInitializer( `'${className}'` );
            fileWillChange = true;

            // Insertar __type justo debajo de la propiedad no estática 'type'
            if ( !cls.getProperty( `__${className}` ) ) {
                const newProp = cls.insertProperty( typeProp.getChildIndex() + 1, {
                    name: `__${className}`,
                    type: `'${className}'`,
                    scope: Scope.Private,
                    hasExclamationToken: true,
                } );

                // Añadir salto de línea después de la propiedad para legibilidad
                newProp.replaceWithText( writer => {
                    writer.write( newProp.getText() ).write( "\n" );
                } );

                fileWillChange = true;
            }


        }

        // 2️⃣ Ajustar propiedad estática 'type'
        const staticTypeProp = cls.getProperties().find( p => p.isStatic() && p.getName() === "type" );
        if ( staticTypeProp ) {
            if ( staticTypeProp.getTypeNode() ) staticTypeProp.removeType();
            staticTypeProp.setInitializer( `'${className}'` );
            fileWillChange = true;
        }
    }


    if ( fileWillChange ) {
        changedFiles++;
        if ( apply ) {
            sf.saveSync();
            console.log( `✔ Modificado: ${filePath}` );
        } else {
            console.log( `[DRY-RUN] Cambios previstos en: ${filePath}` );
        }
    }
}

console.log( `Archivos con cambios detectados: ${changedFiles}` );
console.log( apply ? "Cambios aplicados." : "Modo dry-run — ejecuta con --apply para aplicar los cambios." );
