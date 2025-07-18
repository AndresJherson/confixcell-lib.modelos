import { Model } from '../index';

export class Utility {

    protected static resolveReferenceDeepModelClone<T extends object>( obj: T ): T {
        const visited = new WeakMap<object, any>();

        const processValue = ( value: any ): any => {
            if ( visited.has( value ) ) return undefined;

            if ( value === null || value === undefined ) {
                return value;
            }

            // Si es array, procesar cada elemento
            if ( Array.isArray( value ) ) {
                const arrClone: any[] = [];
                visited.set( value, arrClone );
                for ( const item of value ) {
                    arrClone.push( processValue( item ) );
                }
                return arrClone;
            }

            // Si es instancia de Model
            if ( value instanceof Model ) {

                const ctor: new ( ...args: any[] ) => Model = value.constructor as any;
                const clone = new ctor();
                visited.set( value, clone );

                for ( const key of Utility.getAllPropertyKeys( value ) ) {

                    const descriptor = Utility.getDescriptor( value, key );
                    if ( !descriptor ) continue;

                    Object.defineProperty( clone, key, {
                        value: processValue( ( value as any )[key as any] ),
                        writable: descriptor.writable,
                        enumerable: descriptor.enumerable,
                        configurable: descriptor.configurable
                    } );
                }

                return clone;
            }

            // Si es un objeto plano, procesar sus propiedades
            if ( typeof value === 'object' && value.constructor === Object ) {
                const objResult: Record<string, any> = {};
                for ( const [key, val] of Object.entries( value ) ) {
                    objResult[key] = processValue( val );
                }
                return objResult;
            }

            // Para tipos primitivos
            return value;
        }

        return processValue( obj );
    }


    private static getAllPropertyKeys<T extends object>( obj: T ): PropertyKey[] {
        const keys = new Set<PropertyKey>();

        let current = obj;
        while ( current && current !== Object.prototype ) {
            for ( const key of Reflect.ownKeys( current ) ) {
                keys.add( key );
            }
            current = Object.getPrototypeOf( current );
        }

        return Array.from( keys );
    }


    private static getDescriptor<T extends Model>( value: T, key: PropertyKey ): PropertyDescriptor | undefined {
        let current = value;
        let descriptor: PropertyDescriptor | undefined;

        while ( current && !descriptor ) {
            descriptor = Object.getOwnPropertyDescriptor( current, key );
            current = Object.getPrototypeOf( current );
        }

        return descriptor;
    }
}