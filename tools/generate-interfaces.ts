import * as ts from 'typescript';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Generates interface code from a class file.
 * @param sourceFilePath The path to the TypeScript file containing the classes.
 * @returns The interface code as a string.
 */
function generateInterfaces(sourceFilePath: string): string {
    const sourceCode = fs.readFileSync(sourceFilePath, 'utf8');
    const sourceFile = ts.createSourceFile(
        path.basename(sourceFilePath),
        sourceCode,
        ts.ScriptTarget.ES2015,
        true
    );

    let interfacesCode = '';
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

    function visit(node: ts.Node) {
        if (ts.isClassDeclaration(node) && node.name) {
            const className = node.name.getText(sourceFile);
            const interfaceName = `I${className}`;
            
            const members = node.members.filter(ts.isPropertyDeclaration).map(member => {
                return ts.factory.createPropertySignature(
                    undefined,
                    member.name,
                    member.questionToken,
                    member.type
                );
            });

            // Adjust heritage clauses to reference interfaces
            const heritageClauses = node.heritageClauses?.map(clause => {
                const types = clause.types.map(type => {
                    const typeText = type.getText(sourceFile);
                    if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                        return ts.factory.createExpressionWithTypeArguments(
                            ts.factory.createIdentifier(`I${typeText}`),
                            undefined
                        );
                    }
                    return type;
                });
                return ts.factory.createHeritageClause(clause.token, types);
            });

            const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
                undefined,
                interfaceName,
                undefined,
                heritageClauses,
                members
            );

            const result = printer.printNode(
                ts.EmitHint.Unspecified,
                interfaceDeclaration,
                sourceFile
            );

            interfacesCode += result + '\n\n';
        }

        ts.forEachChild(node, visit);
    }

    visit(sourceFile);
    return interfacesCode;
}

// -----------------------------------------------------------------------
// Main script execution
// -----------------------------------------------------------------------

const rootDir = path.resolve(__dirname, '..'); // Points to the root directory
const indexFile = path.join(rootDir, 'src', 'index.ts');
const outputDir = path.join(rootDir, 'src', 'interfaces');
const outputInterfacesFile = path.join(outputDir, 'interfaces.ts');

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

let allInterfacesCode = '';
let importStatements = '';

// Read the index.ts file to find re-exported files
const indexSourceFile = ts.createSourceFile(
    indexFile,
    fs.readFileSync(indexFile, 'utf8'),
    ts.ScriptTarget.ES2015,
    true
);

indexSourceFile.statements.forEach(statement => {
    if (ts.isExportDeclaration(statement) && statement.moduleSpecifier) {
        const modulePath = statement.moduleSpecifier.getText(indexSourceFile).replace(/['"]/g, '');
        const fullPath = path.resolve(path.dirname(indexFile), `${modulePath}.ts`);

        try {
            const interfacesForFile = generateInterfaces(fullPath);
            allInterfacesCode += interfacesForFile;

        } catch (e) {
            console.error(`Error processing file: ${fullPath}`, e);
        }
    }
});

// Add import statements for interfaces from the same output directory
const classNames = allInterfacesCode.match(/export interface I(\w+)/g)?.map(match => match.replace('export interface ', ''));
if (classNames && classNames.length > 0) {
    // Generate import statements for the new interfaces file
    const newImports = `import { ${classNames.join(', ')} } from './interfaces';\n\n`;
    allInterfacesCode = newImports + allInterfacesCode;
}

// Write the result to the new file
fs.writeFileSync(outputInterfacesFile, allInterfacesCode, 'utf8');

console.log(`✅ Interfaces generated successfully in ${outputInterfacesFile}`);