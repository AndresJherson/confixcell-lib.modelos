import { UtilPropertyDescriptor } from "./UtilPropertyDescriptors";

const IMPLEMENTS_KEY = Symbol( "implements" );

type Newable<T = any> = abstract new ( ...args: any[] ) => T;

interface TypedInstanceMap extends Map<Function, any[]> {

    // ====== get ======
    // Sin genérico → constructor -> InstanceType<C>
    get<C extends Newable>( ctor: C ): InstanceType<C>[] | undefined;
    // Con genérico → runtime token asociado a interfaz
    get<T>( ctor: Function ): T[] | undefined;

    // ====== set ======
    set<C extends Newable>( ctor: C, value: InstanceType<C>[] ): this;
    set<T>( ctor: Function, value: T[] ): this;

    // ====== delete ======
    delete<C extends Newable>( ctor: C ): boolean;
    delete<T>( ctor: Function ): boolean;

    // ====== has ======
    has<C extends Newable>( ctor: C ): boolean;
    has<T>( ctor: Function ): boolean;
}



export class UtilModels {

    static implements( target: Function, interfaces: Function[] ) {
        const existing: Function[] = Reflect.getMetadata( IMPLEMENTS_KEY, target ) || [];
        Reflect.defineMetadata( IMPLEMENTS_KEY, [...new Set( [...existing, ...interfaces] )], target );
    }


    static getAllClasses( ctor: Function ): Function[] {

        let all: Function[] = [];
        let current: any = ctor;

        while ( current && current !== Object ) {
            all = [...new Set( [...all, current] )];
            current = Object.getPrototypeOf( current );
        }

        return all;
    }


    static getAllInterfaces( ctor: Function ): Function[] {

        let all: Function[] = [];
        let current: any = ctor;

        while ( current && current !== Object ) {
            const ifaces: Function[] = Reflect.getMetadata( IMPLEMENTS_KEY, current ) || [];
            all = [...new Set( [...all, ...ifaces] )];
            current = Object.getPrototypeOf( current );
        }

        return all;
    }


    static isInstanceOf<I extends object>(
        obj: object,
        iface: new ( ...args: any[] ) => I
    ): obj is I;

    static isInstanceOf<T extends object>(
        obj: object,
        iface: new ( ...args: any[] ) => any
    ): obj is T;

    static isInstanceOf<T extends object>(
        obj: object,
        iface: new ( ...args: any[] ) => any
    ): obj is T {

        if ( !( obj && typeof obj === "object" ) ) return false;

        if ( obj instanceof iface ) return true;

        const ctor = obj.constructor;
        const interfaces = this.getAllInterfaces( ctor );
        return interfaces.includes( iface );
    }


    static indexInstances( root: object ): TypedInstanceMap {
        const seen = new WeakSet();
        const registry = new Map<Function, any[]>();

        function register( target: Function, value: any ) {
            if ( !registry.has( target ) ) registry.set( target, [] );
            registry.get( target )!.push( value );
        }

        function processValue( value: any ) {
            if ( value === null || typeof value !== "object" || seen.has( value ) ) return;
            seen.add( value );

            const ctor: Function = value.constructor;

            // 1. Registrar la clases heredadas y concreta
            const xclasses = UtilModels.getAllClasses( ctor );
            for ( const xclass of xclasses ) register( xclass, value );

            // 2. Registrar todas las interfaces runtime heredadas
            const interfaces = UtilModels.getAllInterfaces( ctor );
            for ( const iface of interfaces ) register( iface, value )

            // 3. Procesar propiedades anidadas
            for ( const key of UtilPropertyDescriptor.getReadablePropertyNames( value ) ) {
                const innerValue = value[key];

                if ( Array.isArray( innerValue ) ) {
                    for ( const item of innerValue ) processValue( item );
                } else if ( typeof innerValue === "object" && innerValue !== null ) {
                    processValue( innerValue );
                }
            }
        }

        processValue( root );
        return registry;
    }

}