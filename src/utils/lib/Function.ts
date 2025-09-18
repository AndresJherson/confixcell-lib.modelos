// Obtener nombre de propiedad
export function nameOf<TObject extends object>( getter: ( obj: TObject ) => any ): string {
    let propertyPath = '';

    const createProxy = ( path: string = '' ): any => {
        return new Proxy( {}, {
            get( _, prop ) {
                const currentPath = path ? `${path}.${String( prop )}` : String( prop );
                propertyPath = currentPath;

                // Devolver otro proxy para permitir encadenamiento
                return createProxy( currentPath );
            }
        } );
    };

    getter( createProxy() as TObject );

    // Devolver solo el nombre de la última propiedad
    return propertyPath.split( '.' ).pop() || '';
}