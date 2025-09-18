import { Cast } from "../../Cast";
import { Utility } from "../../Utility";
import { ClassType, Immutable, PropBehavior, PropertyInfo, PropGetValue } from '../index';
import { UtilPropertyDescriptor } from '../../../index';

export class UtilImmutable extends Utility {


    static initialize<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined || typeof dto !== 'object' ) return;

        const item = UtilImmutable.resolveReferenceDeepModelClone( dto );

        const initializedProperties = new Set<string>();
        let prototype = Object.getPrototypeOf( target );
        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = ClassType.getTypeInfo( prototype );

            for ( const [propertyName, propertyInfo] of Object.entries( typeInfo?.recordPropertyInfo ?? {} ) ) {

                // Validacion de propiedades y referencia
                if ( UtilPropertyDescriptor.isReadonly( target, propertyName ) ) continue;
                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !( propertyName in item ) ) continue;

                const prevValue = ( target as any )[propertyName];
                const nextValue = ( item as any )[propertyName];


                // Valores null
                if ( nextValue === null ) {
                    Reflect.set( target, propertyName, null );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( nextValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }


                UtilImmutable.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    prevValue,
                    nextValue
                } );


                initializedProperties.add( propertyName );

            }

            prototype = Object.getPrototypeOf( prototype );

        }
    }


    static set<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined ) return;

        const item = UtilImmutable.resolveReferenceDeepModelClone( dto );

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = ClassType.getTypeInfo( prototype );

            const properties = new Set( [
                ...Object.getOwnPropertyNames( target ),
                ...Object.keys( typeInfo?.recordPropertyInfo ?? {} )
            ] )

            for ( const [propertyName, nextValue] of Object.entries( item ) ) {

                if ( UtilPropertyDescriptor.isReadonly( target, propertyName ) ) continue;
                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !properties.has( propertyName ) ) continue;

                const prevValue = ( target as any )[propertyName];

                // Valores null
                if ( nextValue === null ) {
                    Reflect.set( target, propertyName, null );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( nextValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];

                if ( !propertyInfo ) {
                    Reflect.set( target, propertyName, nextValue );
                    initializedProperties.add( propertyName );
                    continue
                };

                UtilImmutable.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    prevValue,
                    nextValue
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
        prevValue: any,
        nextValue: any
    } ) {

        const { target, propertyName, propertyInfo, prevValue, nextValue } = parameters;
        const { metadata } = propertyInfo;
        const { behavior, getValue } = metadata;

        if ( behavior === PropBehavior.string ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setString( nextValue )
            );
        }
        else if ( behavior === PropBehavior.number ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setNumber( nextValue )
            );
        }
        else if ( behavior === PropBehavior.boolean ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Boolean( nextValue )
            );
        }
        else if ( metadata.behavior === PropBehavior.model ) {

            Reflect.set(
                target,
                propertyName,
                UtilImmutable.resolveValue( {
                    getValue,
                    prevValue,
                    nextValue
                } )
            )

        }
        else if ( behavior === PropBehavior.array ) {

            const prevArray: any[] = Array.isArray( prevValue ) ? prevValue : [];
            const nextArray: any[] | undefined = Array.isArray( nextValue )
                ? nextValue.map( ( nextItem, i ) => {
                    const prevItem = prevArray[i];
                    return UtilImmutable.resolveValue( {
                        getValue,
                        prevValue: prevItem,
                        nextValue: nextItem
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
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setDate( nextValue )
            );
        }
        else if ( behavior === PropBehavior.time ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setTime( nextValue )
            );
        }
        else if ( behavior === PropBehavior.datetime ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setDateTime( nextValue )
            );
        }
        else if ( behavior === PropBehavior.object ) {
            Reflect.set(
                target,
                propertyName,
                getValue
                    ? (
                        getValue.length === 1
                            ? getValue( nextValue, undefined )
                            : getValue( prevValue, nextValue )
                    )
                    : Cast.setObject( nextValue )
            );
        }
        else {
            Reflect.set( target, propertyName, nextValue );
        }
    }


    private static resolveValue<T extends PropBehavior>( parameters: {
        getValue?: PropGetValue<T>,
        prevValue: any,
        nextValue: any
    } ) {

        const { getValue, prevValue, nextValue } = parameters;

        let processedValue: any | undefined = getValue
            ? (
                getValue.length === 1
                    ? getValue( nextValue, undefined )
                    : getValue( prevValue, nextValue )
            )
            : undefined;

        if ( processedValue === undefined ) {

            const ctor = ClassType.getClass( nextValue );
            if ( ctor ) {
                processedValue = new ctor( nextValue );
            }

        }

        return processedValue;
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

            for ( const [propertyName, nextValue] of Object.entries( item ) ) {

                if ( UtilPropertyDescriptor.isReadonly( target, propertyName ) ) continue;
                if ( initializedProperties.has( propertyName ) ) continue;
                if ( !properties.has( propertyName ) ) continue;


                // Valores null
                if ( nextValue === null ) {
                    Reflect.set( target, propertyName, null );
                    initializedProperties.add( propertyName );
                    continue;
                }
                else if ( nextValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    continue;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];
                if ( !propertyInfo ) continue;

                ( target as any )[propertyName] = nextValue;

                initializedProperties.add( propertyName );

            }

            prototype = Object.getPrototypeOf( prototype );
        }


    }


    static getInstancesOf<
        TRoot extends object,
        TTargetClass extends typeof Immutable
    >( root: TRoot, targetClass: TTargetClass ): InstanceType<TTargetClass>[] {
        const seen = new WeakSet()
        const results: InstanceType<TTargetClass>[] = [];

        function processValue( obj: any ) {
            if ( obj === null || typeof obj !== 'object' || seen.has( obj ) ) return;
            seen.add( obj );

            if ( obj instanceof targetClass ) {
                const ctor = obj.constructor as new ( ...args: any ) => InstanceType<TTargetClass>;
                results.push( new ctor( obj ) );
            }

            for ( const key of UtilPropertyDescriptor.getReadablePropertyNames( obj ) ) {
                const value = obj[key];

                if ( typeof value === 'object' && value !== null ) {
                    if ( Array.isArray( value ) ) {
                        for ( const item of value ) processValue( item );
                    } else {
                        processValue( value );
                    }
                }

            }
        }

        processValue( root );
        return results;
    }


    static setInstanceBySymbol<
        TRoot extends object,
        TTargetClass extends typeof Immutable
    >( root: TRoot, targetClass: TTargetClass, record: Record<symbol, InstanceType<TTargetClass>> ) {
        UtilImmutable.setInstanceByKey( root, targetClass, record, 'symbol' );
    }

    static setInstanceByUuid<
        TRoot extends object,
        TTarget extends typeof Immutable
    >( root: TRoot, targetClass: TTarget, record: Record<string, InstanceType<TTarget>> ) {
        UtilImmutable.setInstanceByKey( root, targetClass, record, 'uuid' );
    }

    private static setInstanceByKey<
        TRoot extends object,
        TTargetClass extends typeof Immutable
    >(
        root: TRoot,
        targetClass: TTargetClass,
        record: Record<any, InstanceType<TTargetClass>>,
        targetKey: 'symbol' | 'uuid'
    ) {

        const seen = new WeakSet()

        const processValue = ( value: any ): void => {

            if (
                value === null ||
                value === undefined ||
                typeof value !== 'object' ||
                seen.has( value )
            ) return;

            seen.add( value );

            for ( const key of UtilPropertyDescriptor.getReadWritePropertyNames( value ) ) {

                let prop: any = value[key];

                if (
                    prop instanceof targetClass &&
                    targetKey in prop
                ) {

                    targetKey = targetKey as keyof Omit<Immutable, keyof Immutable>;

                    if (
                        prop[targetKey] != null &&
                        prop[targetKey] in record
                    ) {
                        const ctor = prop.constructor as new ( ...args: any ) => InstanceType<TTargetClass>;
                        value[key] = new ctor( record[prop[targetKey]] );
                    }
                }
                else {
                    processValue( prop );
                }
            }
        }

        return processValue( root );
    }

}