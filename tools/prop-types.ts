import { Project } from "ts-morph";
import fs from "fs";
import path from "path";
import { Type, SymbolFlags } from "ts-morph";


function getTypeString( type: Type ): string {

    const symbol = type.getSymbol() || type.getApparentType().getSymbol();
    if ( !symbol ) return type.getText();

    let typeName = symbol.getName();

    // Detectar si es un tipo genérico con argumentos
    const typeArgs = type.getTypeArguments?.() ?? [];
    if ( type.getTargetType && type.getTargetType() && typeArgs.length > 0 ) {
        const argStrings = typeArgs.map( arg => getTypeString( arg ) );
        typeName += `<${argStrings.join( ", " )}>`;
    }

    // Si es array, ajustar con Array<>
    if ( type.isArray() ) {
        const elementType = type.getArrayElementType();
        if ( elementType ) {
            return `Array<${getTypeString( elementType )}>`;
        }
    }

    return typeName;
}


const project = new Project( {
    tsConfigFilePath: "tsconfig.json"
} );

const sourceFiles = project.getSourceFiles( "src/lib/**/*.ts" );

const metadata: Record<string, Record<string, string>> = {};

for ( const sourceFile of sourceFiles ) {
    for ( const cls of sourceFile.getClasses() ) {
        const className = cls.getName();
        if ( !className ) continue;

        for ( const prop of cls.getProperties() ) {
            const decorators = prop.getDecorators();
            const hasPropSet = decorators.some( d => d.getFullName()?.includes( "Prop.Set" ) );

            if ( !hasPropSet ) continue;

            const propName = prop.getName();
            const type = prop.getType();
            const unionTypes = type.isUnion() ? type.getUnionTypes() : [type];
            const relevantType = unionTypes.find( t => !t.isNull() && !t.isUndefined() );

            if ( !relevantType ) continue;

            const typeString = getTypeString( relevantType );

            metadata[className] = metadata[className] || {};
            metadata[className][propName] = typeString;
        }

        for ( const accessor of cls.getGetAccessors() ) {
            const decorators = accessor.getDecorators();
            const hasPropSet = decorators.some( d => d.getFullName()?.includes( "Prop.Set" ) );
            if ( !hasPropSet ) continue;

            const propName = accessor.getName();
            const type = accessor.getReturnType();
            const unionTypes = type.isUnion() ? type.getUnionTypes() : [type];
            const relevantType = unionTypes.find( t => !t.isNull() && !t.isUndefined() );
            if ( !relevantType ) continue;

            const typeString = getTypeString( relevantType );
            metadata[className] = metadata[className] || {};
            metadata[className][propName] = typeString;
        }
    }
}

// Guardar como archivo TypeScript
const outputPath = path.resolve( "dev/prop-types.ts" );
const output = `export const PropTypes: Record<string, Record<string, string>> = ${JSON.stringify( metadata, null, 4 )} as const;\n`;

fs.mkdirSync( path.dirname( outputPath ), { recursive: true } );
fs.writeFileSync( outputPath, output );

console.log( "✅ Tipos exportados en src/lib/utils/prop-types.ts" );