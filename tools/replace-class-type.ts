// scripts/replace-class-type.ts
import fs from "fs";
import path from "path";

const TARGET_DECORATOR = "@Prop.Class()";
const directory = path.resolve( __dirname, "../src/lib" ); // 👈 ajusta la ruta base de tu proyecto

function processFile( filePath: string ) {
    let content = fs.readFileSync( filePath, "utf8" );
    if ( !content.includes( TARGET_DECORATOR ) ) return;

    // Buscar todas las clases con @Prop.Class()
    const classRegex = /@Prop\.Class\(\)\s*export\s+class\s+(\w+)\s+.*?{([\s\S]*?)}/g;

    let modified = false;

    content = content.replace( classRegex, ( match, className, body ) => {
        let newBody = body;

        // Reemplazar static override type
        newBody = newBody.replace(
            /static\s+override\s+type\s*:\s*string\s*=\s*ModelType\.\w+;/,
            `static override type = '${className}';`
        );

        // Reemplazar override type
        newBody = newBody.replace(
            /override\s+type\s*:\s*string\s*=\s*ModelType\.\w+;/,
            `override type = '${className}';`
        );

        if ( newBody !== body ) {
            modified = true;
            return `@Prop.Class()\nexport class ${className} extends EntradaRecurso {${newBody}}`;
        }
        return match;
    } );

    if ( modified ) {
        fs.writeFileSync( filePath, content, "utf8" );
        console.log( `✔ Modificado: ${filePath}` );
    }
}

function walkDir( dir: string ) {
    for ( const file of fs.readdirSync( dir ) ) {
        const fullPath = path.join( dir, file );
        const stat = fs.statSync( fullPath );

        if ( stat.isDirectory() ) {
            walkDir( fullPath );
        } else if ( file.endsWith( ".ts" ) ) {
            processFile( fullPath );
        }
    }
}

// Ejecutar
walkDir( directory );
