import { Project, SyntaxKind } from "ts-morph";

const project = new Project( {
    tsConfigFilePath: "./tsconfig.json",
} );

const sourceFiles = project.getSourceFiles( "src/lib/**/*.ts" );

for ( const sourceFile of sourceFiles ) {
    const classes = sourceFile.getClasses();

    for ( const classDec of classes ) {
        const props = classDec.getProperties();

        for ( const prop of props ) {
            const typeNode = prop.getTypeNode();
            if ( !typeNode ) continue;

            const typeText = typeNode.getText();
            const hasInitializer = prop.hasInitializer();
            const isOptional = prop.hasQuestionToken();

            // Si la propiedad es opcional o no tiene inicializador
            if ( isOptional || !hasInitializer ) {
                // Si aún no incluye "null" en el tipo
                if ( !typeText.includes( "null" ) ) {
                    const newType = `${typeText} | null`;
                    prop.setType( newType );
                }
            }
        }
    }

    // Guardar los cambios en el archivo
    sourceFile.saveSync();
}
