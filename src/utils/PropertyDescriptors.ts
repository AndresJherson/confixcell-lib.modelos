// Tipo para representar información de una propiedad
interface PropertyDescriptorInfo {
    name: string;
    readable: boolean;
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
    source: string; // 'own' | nombre del prototipo
}

/**
 * Obtiene todas las propiedades de un objeto y sus prototipos
 */
function getAllProperties( obj: any ): PropertyDescriptorInfo[] {
    const properties: PropertyDescriptorInfo[] = [];
    const visitedProps = new Set<string>();

    let current = obj;
    let prototypeLevel = 0;

    while ( current && current !== Object.prototype ) {
        const source = prototypeLevel === 0 ? 'own' : current.constructor?.name || `prototype-${prototypeLevel}`;

        // Obtener todas las propiedades (enumerables y no enumerables)
        const propNames = Object.getOwnPropertyNames( current );

        for ( const propName of propNames ) {
            // Evitar duplicados (las propiedades propias tienen prioridad)
            if ( visitedProps.has( propName ) ) continue;
            visitedProps.add( propName );

            try {
                const descriptor = Object.getOwnPropertyDescriptor( current, propName );
                if ( !descriptor ) continue;

                const isAccessor = 'get' in descriptor || 'set' in descriptor;

                // Filtrar funciones y métodos
                if ( !isAccessor && typeof descriptor.value === 'function' ) {
                    continue;
                }

                const readable = isAccessor ? !!descriptor.get : 'value' in descriptor;
                const writable = isAccessor ? !!descriptor.set : !!descriptor.writable;

                properties.push( {
                    name: propName,
                    readable,
                    writable,
                    enumerable: descriptor.enumerable || false,
                    configurable: descriptor.configurable || false,
                    source
                } );
            } catch ( error ) {
                // Algunas propiedades pueden no ser accesibles
                continue;
            }
        }

        current = Object.getPrototypeOf( current );
        prototypeLevel++;
    }

    return properties;
}

/**
 * Obtiene propiedades con capacidad de lectura (readable = true)
 */
function getReadableProperties( obj: any ): PropertyDescriptorInfo[] {
    return getAllProperties( obj ).filter( prop => prop.readable );
}

/**
 * Obtiene propiedades de solo lectura (readable = true, writable = false)
 */
function getReadOnlyProperties( obj: any ): PropertyDescriptorInfo[] {
    return getAllProperties( obj ).filter( prop => prop.readable && !prop.writable );
}

/**
 * Obtiene propiedades con capacidad de escritura (writable = true)
 */
function getWritableProperties( obj: any ): PropertyDescriptorInfo[] {
    return getAllProperties( obj ).filter( prop => prop.writable );
}

/**
 * Obtiene propiedades de solo escritura (writable = true, readable = false)
 */
function getWriteOnlyProperties( obj: any ): PropertyDescriptorInfo[] {
    return getAllProperties( obj ).filter( prop => prop.writable && !prop.readable );
}

/**
 * Obtiene propiedades con capacidad de lectura y escritura (readable = true, writable = true)
 */
function getReadWriteProperties( obj: any ): PropertyDescriptorInfo[] {
    return getAllProperties( obj ).filter( prop => prop.readable && prop.writable );
}

// Funciones auxiliares para obtener solo los nombres de las propiedades
const getReadablePropertyNames = ( obj: any ): string[] =>
    getReadableProperties( obj ).map( p => p.name );

const getReadOnlyPropertyNames = ( obj: any ): string[] =>
    getReadOnlyProperties( obj ).map( p => p.name );

const getWritablePropertyNames = ( obj: any ): string[] =>
    getWritableProperties( obj ).map( p => p.name );

const getWriteOnlyPropertyNames = ( obj: any ): string[] =>
    getWriteOnlyProperties( obj ).map( p => p.name );

const getReadWritePropertyNames = ( obj: any ): string[] =>
    getReadWriteProperties( obj ).map( p => p.name );


// Funciones utilitarios
const isReadonly = ( obj: any, propertyName: string ): boolean => {

    if ( getReadOnlyPropertyNames( obj ).includes( propertyName ) ) {
        return true;
    }

    return false;
}

// Obtener constructor
function getConstructor( target: any ): ( ( new ( ...args: any[] ) => any ) & Record<any, any> ) | undefined {
    if ( typeof target === 'function' ) return target; // Ya es constructor
    if ( typeof target?.constructor === 'function' ) return target.constructor; // Cuando es instancia
    if ( typeof target?.prototype?.constructor === 'function' ) return target.prototype.constructor; // Cuando es clase
    return undefined;
}


class UtilPropertyDescriptor {
    static readonly getAllProperties = getAllProperties;
    static readonly getReadableProperties = getReadableProperties;
    static readonly getReadOnlyProperties = getReadOnlyProperties;
    static readonly getWritableProperties = getWritableProperties;
    static readonly getWriteOnlyProperties = getWriteOnlyProperties;
    static readonly getReadWriteProperties = getReadWriteProperties;
    static readonly getReadablePropertyNames = getReadablePropertyNames;
    static readonly getReadOnlyPropertyNames = getReadOnlyPropertyNames;
    static readonly getWritablePropertyNames = getWritablePropertyNames;
    static readonly getWriteOnlyPropertyNames = getWriteOnlyPropertyNames;
    static readonly getReadWritePropertyNames = getReadWritePropertyNames;
    static readonly isReadonly = isReadonly;
    static readonly getConstructor = getConstructor;
}

export {
    UtilPropertyDescriptor,
    type PropertyDescriptorInfo
}