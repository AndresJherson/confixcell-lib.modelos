import fs from "fs";

function minifyDTS( inputPath: string, outputPath: string ) {
    let code = fs.readFileSync( inputPath, "utf8" );

    // 1. Eliminar comentarios /** ... */ y //
    code = code.replace( /\/\*[\s\S]*?\*\//g, "" );
    code = code.replace( /\/\/.*$/gm, "" );

    // 2. Quitar saltos de línea y tabulaciones
    code = code.replace( /\s+/g, " " );

    // 3. Quitar espacios innecesarios entre símbolos
    code = code.replace( /\s*([{}();,:<>\[\]])\s*/g, "$1" );

    fs.writeFileSync( outputPath, code.trim(), "utf8" );
    console.log( `✅ Minificado: ${outputPath}` );
}

// Uso:
minifyDTS( "./docs/domain-interfaces.d.ts", "./docs/domain-interfaces-min.d.ts" );
