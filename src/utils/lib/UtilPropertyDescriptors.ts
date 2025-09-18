//Tipo para representar información de una propiedad
interface PropertyDescriptorInfo<T extends object> {
    name: string & keyof T;
    readable: boolean;
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
    source: string; // 'own' | nombre del prototipo
}

/**
 * Obtiene todas las propiedades de un objeto y sus prototipos
 */
function getAllProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    const properties: PropertyDescriptorInfo<T>[] = [];
    const visitedProps = new Set<string>();

    let current = obj;
    let prototypeLevel = 0;

    while ( current && current !== Object.prototype ) {
        const source = prototypeLevel === 0 ? 'own' : current.constructor?.name || `prototype-${prototypeLevel}`;

        // Obtener todas las propiedades (enumerables y no enumerables)
        const propNames = Object.getOwnPropertyNames( current ) as Array<string & keyof T>;

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
function getReadableProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    return getAllProperties( obj ).filter( prop => prop.readable );
}

/**
 * Obtiene propiedades de solo lectura (readable = true, writable = false)
 */
function getReadOnlyProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    return getAllProperties( obj ).filter( prop => prop.readable && !prop.writable );
}

/**
 * Obtiene propiedades con capacidad de escritura (writable = true)
 */
function getWritableProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    return getAllProperties( obj ).filter( prop => prop.writable );
}

/**
 * Obtiene propiedades de solo escritura (writable = true, readable = false)
 */
function getWriteOnlyProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    return getAllProperties( obj ).filter( prop => prop.writable && !prop.readable );
}

/**
 * Obtiene propiedades con capacidad de lectura y escritura (readable = true, writable = true)
 */
function getReadWriteProperties<T extends object>( obj: T ): PropertyDescriptorInfo<T>[] {
    return getAllProperties( obj ).filter( prop => prop.readable && prop.writable );
}

// Funciones auxiliares para obtener solo los nombres de las propiedades
const getAllPropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getAllProperties( obj ).map( p => p.name );

const getReadablePropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getReadableProperties( obj ).map( p => p.name );

const getReadOnlyPropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getReadOnlyProperties( obj ).map( p => p.name );

const getWritablePropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getWritableProperties( obj ).map( p => p.name );

const getWriteOnlyPropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getWriteOnlyProperties( obj ).map( p => p.name );

const getReadWritePropertyNames = <T extends object>( obj: T ): Array<string & keyof T> =>
    getReadWriteProperties( obj ).map( p => p.name );


// Funciones utilitarios
const isReadonly = <T extends object>( obj: T, propertyName: string ): boolean => {

    if ( getReadOnlyPropertyNames( obj ).includes( propertyName as any ) ) {
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

    static readonly getAllPropertyNames = getAllPropertyNames;
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