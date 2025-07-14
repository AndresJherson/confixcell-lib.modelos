import { Cast, Model, PropBehavior, PropertyInfo, PropGetValue, PropMetadataProperty, TypeInfo, ValueCallback } from '../../index';

export class PropImplementation {

    private static recordMetadata = new Map<string, TypeInfo>();
    private static classRegistry = new Map<string, typeof Model>();
    private static extendedPropertyRegistry = new WeakMap<Function, Set<string | symbol>>();


    static defineClass( target: any ): void {
        if ( target.type ) {

            const className = target.type;

            PropImplementation.classRegistry.set( className, target );

            const typeInfo: TypeInfo = PropImplementation.getTypeInfo( target ) ?? {
                name: className,
                recordPropertyInfo: {}
            };

            PropImplementation.recordMetadata.set( className, typeInfo );
        }
    }


    static getClass<T extends Model>( instance?: Object ) {
        try {
            if ( instance === undefined || instance === null ) return undefined;

            const className = typeof instance === 'object'
                ? ( Object.getPrototypeOf( instance ).constructor.type ?? ( instance as any ).type )
                : undefined;

            return PropImplementation.classRegistry.get( className.toString() ) as unknown as new ( ...args: any[] ) => T;
        }
        catch ( error ) {
            return undefined;
        }
    }


    private static getTypeInfo( target: any ): TypeInfo | undefined {
        try {
            const constructorName = target.prototype?.constructor.type ?? target.constructor.type;
            return PropImplementation.recordMetadata.get( constructorName );
        }
        catch ( error ) {
            return undefined;
        }
    }


    static defineProperty<T extends PropBehavior>( parameters: {
        target: any,
        propertyKey: string | symbol,
        metadata: PropMetadataProperty<T>
    } ) {
        const { target, propertyKey, metadata } = parameters;

        const {
            constructorName,
            resolvedMetadata
        } = PropImplementation.resolvePropertyMetadata( { target, propertyKey, metadata } )

        if ( 'extends' in resolvedMetadata && resolvedMetadata.extends === true ) {
            PropImplementation.defineExtendedProperty( target, propertyKey );
        }

        PropImplementation.definePropertyInfo( {
            target,
            constructorName,
            propertyKey: propertyKey.toString(),
            metadata: resolvedMetadata
        } )
    }

    private static resolvePropertyMetadata( parameters: {
        target: any,
        propertyKey: string | symbol,
        metadata: PropMetadataProperty<any>
    } ) {

        const { target, propertyKey, metadata } = parameters;
        const { behavior } = metadata;

        const constructorName = target.prototype?.constructor.type ?? target.constructor.type;
        const propertyType = Reflect.getMetadata( 'design:type', target, propertyKey );
        console.log( propertyKey, propertyType );

        let resolvedBehavior: string | undefined;
        try {
            resolvedBehavior = behavior
                ? behavior.toString()
                : String( propertyType.name ).toLowerCase();
        }
        catch ( error ) {
            resolvedBehavior = undefined;
        }

        return {
            constructorName,
            resolvedMetadata: {
                ...metadata,
                behavior: resolvedBehavior
            }
        }
    }

    private static defineExtendedProperty( target: Object, key: string | symbol ): void {

        const ctor = target.constructor;

        (
            PropImplementation.extendedPropertyRegistry.get( ctor ) ??
            PropImplementation.extendedPropertyRegistry.set( ctor, new Set() ).get( ctor )
        )!.add( key );

    }

    private static getExtendedKeys<T extends object>( obj: T ): ( keyof T )[] {

        const keys = new Set<string | symbol>();
        let proto = Object.getPrototypeOf( obj );

        while ( proto && proto.constructor !== Object ) {

            const ctor = proto.constructor;
            const set = PropImplementation.extendedPropertyRegistry.get( ctor );

            if ( set ) {
                for ( const key of set ) keys.add( key );
            }

            proto = Object.getPrototypeOf( proto );
        }

        return Array.from( keys ) as any[];
    }

    private static definePropertyInfo( parameters: {
        target: any,
        propertyKey: string,
        constructorName: string,
        metadata: PropMetadataProperty<any>
    } ) {
        const { target, propertyKey, constructorName, metadata } = parameters;

        const propertyInfo: PropertyInfo = {
            name: propertyKey,
            metadata: metadata
        };

        const typeInfo: TypeInfo = this.getTypeInfo( target ) ?? {
            name: constructorName,
            recordPropertyInfo: {}
        };

        typeInfo.recordPropertyInfo[propertyKey.toString()] = propertyInfo;

        PropImplementation.recordMetadata.set( constructorName, typeInfo );
    }


    static initialize<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined || typeof dto !== 'object' ) return;

        const item = Cast.deepClone( dto );

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = PropImplementation.getTypeInfo( prototype );

            Object.entries( typeInfo?.recordPropertyInfo ?? {} ).forEach( ( [propertyName, propertyInfo] ) => {

                // Validacion de propiedades y referencia
                if ( initializedProperties.has( propertyName ) ) return;
                if ( !( propertyName in item ) ) return;

                const originalValue = ( target as any )[propertyName];
                const value = ( item as any )[propertyName];


                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    return;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    return;
                }


                PropImplementation.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    originalValue,
                    value
                } );


                initializedProperties.add( propertyName );

            } );

            prototype = Object.getPrototypeOf( prototype );

        }
    }


    static set<T extends object>( target: T, dto?: object ) {
        if ( dto === null || dto === undefined ) return;

        const item = Cast.deepClone( dto );

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = PropImplementation.getTypeInfo( prototype );

            const properties = new Set( [
                ...Object.getOwnPropertyNames( target ),
                ...Object.keys( typeInfo?.recordPropertyInfo ?? {} )
            ] )

            Object.entries( item ).forEach( ( [propertyName, value]: [string, any] ) => {

                if ( initializedProperties.has( propertyName ) ) return;
                if ( !properties.has( propertyName ) ) return;

                const originalValue = ( target as any )[propertyName];

                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    return;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    return;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];

                if ( !propertyInfo ) return;

                PropImplementation.initializeProperties( {
                    target,
                    propertyName,
                    propertyInfo,
                    originalValue,
                    value
                } )

                initializedProperties.add( propertyName );

            } );

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
                PropImplementation.resolveValue( {
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
                    return PropImplementation.resolveValue( {
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

            const ctor = PropImplementation.getClass( value );
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

            const typeInfo = PropImplementation.getTypeInfo( prototype );

            const properties = new Set( [
                ...Object.getOwnPropertyNames( target ),
                ...Object.keys( typeInfo?.recordPropertyInfo ?? {} )
            ] )

            Object.entries( item ).forEach( ( [propertyName, value]: [string, any] ) => {

                if ( initializedProperties.has( propertyName ) ) return;
                if ( !properties.has( propertyName ) ) return;

                const originalValue = ( target as any )[propertyName];

                // Valores null
                if ( ( value === null || value === undefined ) && originalValue === undefined ) {
                    Reflect.set( target, propertyName, undefined );
                    initializedProperties.add( propertyName );
                    return;
                }
                else if ( value === null && originalValue !== undefined ) {
                    initializedProperties.add( propertyName );
                    return;
                }

                const propertyInfo = typeInfo?.recordPropertyInfo[propertyName];
                if ( !propertyInfo ) return;

                ( target as any )[propertyName] = value;

                initializedProperties.add( propertyName );

            } );

            prototype = Object.getPrototypeOf( prototype );
        }


    }


    static extends<
        Host extends object,
        Comp extends object
    >(
        host: Host,
        propName: string,
        component: Comp,
    ): void {

        const extendedKeys = PropImplementation.getExtendedKeys( component );

        PropImplementation.copyInitialValues( host, component, extendedKeys )

        Object.defineProperty( host, propName, {
            value: component,
            configurable: true,
            enumerable: false
        } );

        for ( const key of extendedKeys ) {

            const desc = PropImplementation.getPropertyDescriptorDeep( component, key );

            if ( desc?.get || desc?.set ) {

                Object.defineProperty( host, key, {
                    get: desc.get ? desc.get.bind( component ) : undefined,
                    set: desc.set ? v => desc.set!.call( component, v ) : undefined,
                    enumerable: desc.enumerable ?? true,
                    configurable: true,
                } );

            } else {

                Object.defineProperty( host, key, {
                    get() { return ( component as any )[key]; },
                    set( v: any ) { ( component as any )[key] = v; },
                    enumerable: desc?.enumerable ?? true,
                    configurable: true,
                } );

            }
        }
    }


    private static copyInitialValues<Host extends object, Comp extends object>(
        host: Host,
        comp: Comp,
        keys: ( keyof Comp )[]
    ) {
        for ( const k of keys ) {
            if ( Object.prototype.hasOwnProperty.call( host, k ) ) {
                const v = ( host as any )[k];
                ( comp as any )[k] = v;      // ← prevalece el valor del hijo
            }
        }
    }


    private static getPropertyDescriptorDeep( obj: any, key: PropertyKey ): PropertyDescriptor | undefined {
        while ( obj && obj !== Object.prototype ) {
            const desc = Object.getOwnPropertyDescriptor( obj, key );
            if ( desc ) return desc;
            obj = Object.getPrototypeOf( obj );
        }
        return undefined;
    }

}