import { Cast } from "../../Cast";
import { Utility } from "../../Utility";
import { ClassType, PropBehavior, PropertyInfo, PropGetValue } from '../index';

export class Immutable extends Utility {

    static initialize<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined || typeof dto !== 'object' ) return;

        const item = Immutable.resolveReferenceDeepModelClone( dto );

        const initializedProperties = new Set<string>();
        let prototype = Object.getPrototypeOf( target );
        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = ClassType.getTypeInfo( prototype );

            for ( const [propertyName, propertyInfo] of Object.entries( typeInfo?.recordPropertyInfo ?? {} ) ) {

                // Validacion de propiedades y referencia
                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !( propertyName in item ) ) continue;

                const originalValue = ( target as any )[propertyName];
                const value = ( item as any )[propertyName];

                
                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    continue;
                }


                Immutable.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    originalValue,
                    value
                } );


                initializedProperties.add( propertyName );

            }

            prototype = Object.getPrototypeOf( prototype );

        }
    }


    static set<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined ) return;

        const item = Immutable.resolveReferenceDeepModelClone( dto );

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = ClassType.getTypeInfo( prototype );

            const properties = new Set( [
                ...Object.getOwnPropertyNames( target ),
                ...Object.keys( typeInfo?.recordPropertyInfo ?? {} )
            ] )

            for ( const [propertyName, value] of Object.entries( item ) ) {

                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !properties.has( propertyName ) ) continue;

                const originalValue = ( target as any )[propertyName];

                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    continue;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];

                if ( !propertyInfo ) continue;

                Immutable.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    originalValue,
                    value
                } )

                initializedProperties.add( propertyName );

            }

            prototype = Object.getPrototypeOf( prototype );
        }
    }


    private static initializeProperties( parameters: {
        target: any,
        propertyName: string,
        propertyInfo: PropertyInfo,
        originalValue: any,
        value: any
    } ) {

        const { target, propertyName, propertyInfo, originalValue, value } = parameters;
        const { metadata } = propertyInfo;
        const { behavior, getValue } = metadata;

        if ( behavior === PropBehavior.string ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setString( value )
            );
        }
        else if ( behavior === PropBehavior.number ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setNumber( value )
            );
        }
        else if ( behavior === PropBehavior.boolean ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Boolean( value )
            );
        }
        else if ( metadata.behavior === PropBehavior.model ) {

            Reflect.set(
                target,
                propertyName,
                Immutable.resolveValue( {
                    getValue,
                    originalValue,
                    value
                } )
            )

        }
        else if ( behavior === PropBehavior.array ) {

            const prevArray: any[] = Array.isArray( originalValue ) ? originalValue : [];
            const nextArray: any[] | undefined = Array.isArray( value )
                ? value.map( ( item, i ) => {
                    const prevItem = prevArray[i];
                    return Immutable.resolveValue( {
                        getValue,
                        originalValue: prevItem,
                        value: item
                    } )
                } )
                    .filter( item => item !== undefined )
                : undefined;

            Reflect.set(
                target,
                propertyName,
                nextArray
            );
        }
        else if ( behavior === PropBehavior.date ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setDate( value )
            );
        }
        else if ( behavior === PropBehavior.time ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setTime( value )
            );
        }
        else if ( behavior === PropBehavior.datetime ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setDateTime( value )
            );
        }
        else if ( behavior === PropBehavior.object ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( value, undefined )
                            : getValue( originalValue, value )
                    )
                    : Cast.setObject( value )
            );
        }
        else {
            Reflect.set( target, propertyName, value );
        }
    }


    private static resolveValue<T extends PropBehavior>( parameters: {
        getValue?: PropGetValue<T>,
        originalValue: any,
        value: any
    } ) {

        const { getValue, originalValue, value } = parameters;

        let nextValue: any | undefined = getValue
            ? (
                getValue.length === 1
                    ? getValue( value, undefined )
                    : getValue( originalValue, value )
            )
            : undefined;

        if ( nextValue === undefined ) {

            const ctor = ClassType.getClass( value );
            if ( ctor ) {
                nextValue = new ctor( value );
            }

        }

        return nextValue;
    }


    static assign<T extends object>( target: T, item?: object ) {

        if ( item === null || item === undefined ) return;

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = ClassType.getTypeInfo( prototype );

            const properties = new Set( [
                ...Object.getOwnPropertyNames( target ),
                ...Object.keys( typeInfo?.recordPropertyInfo ?? {} )
            ] )

            for ( const [propertyName, value] of Object.entries( item ) ) {

                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !properties.has( propertyName ) ) continue;

                const originalValue = ( target as any )[propertyName];

                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    continue;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];
                if ( !propertyInfo ) continue;

                ( target as any )[propertyName] = value;

                initializedProperties.add( propertyName );

            }

            prototype = Object.getPrototypeOf( prototype );
        }


    }

}