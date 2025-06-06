import Decimal from 'decimal.js';
import { DateTime, Duration, Interval } from 'luxon';
import 'reflect-metadata';

export enum PropBehavior
{
    string = 'string',
    text = 'text',
    number = 'number',
    boolean = 'boolean',
    time = 'time',
    date = 'date',
    datetime = 'datetime',
    object = 'object',
    model = 'model',
    array = 'array'
}

type PropValue<T extends PropBehavior> =
    T extends PropBehavior.string | PropBehavior.text |
    PropBehavior.time | PropBehavior.date | PropBehavior.datetime ? ( value: any ) => String :
    T extends PropBehavior.number ? ( value: any ) => Number :
    T extends PropBehavior.boolean ? ( value: any ) => Boolean :
    T extends PropBehavior.object ? ( value: any ) => Object :
    T extends PropBehavior.model | PropBehavior.array ? ( value: any ) => Model :
    never;

export class Prop
{
    public static recordMetadata = new Map<string, TypeInfo>();
    public static classRegistry = new Map<string, typeof Model>();


    static Class(): ClassDecorator 
    {
        return ( target: any ) => {
            if ( target.type ) {
                
                const className = target.type;

                Prop.classRegistry.set(className, target);

                const typeInfo: TypeInfo = this.GetTypeInfo( target ) ?? {
                    name: className,
                    recordPropertyInfo: {}
                };
    
                Prop.recordMetadata.set( className, typeInfo );
            }
        };
    }

    
    static GetClass<T extends Model>( instance?: Object )
    {
        try {
            if ( instance === undefined || instance === null ) return undefined;
            
            const className = typeof instance === 'object'
                                ? ( Object.getPrototypeOf( instance ).constructor.type ?? (instance as any ).type )
                                : undefined;

            return Prop.classRegistry.get( className.toString() ) as unknown as new (...args:any[] )=> T;
        }
        catch ( error ) {
            return undefined;
        }
    }


    static Set<T extends PropBehavior>( behavior?: T, getValue?: PropValue<T> ): PropertyDecorator
    {
        return ( target: any, propertyKey ) => {
            
            const className = target.prototype?.constructor.type ?? target.constructor.type;
            // console.log( target, '|', constructorName, '|', propertyKey );
            const propertyType = Reflect.getMetadata( 'design:type', target, propertyKey );
            const newBehavior = behavior ?? String( propertyType.name ).toLowerCase();

            const propertyInfo: PropertyInfo<any> = {
                name: propertyKey.toString(),
                getValue: getValue,
                behavior: newBehavior
            };

            const typeInfo: TypeInfo = this.GetTypeInfo( target ) ?? {
                name: className,
                recordPropertyInfo: {}
            };

            typeInfo.recordPropertyInfo[ propertyKey.toString() ] = propertyInfo;

            Prop.recordMetadata.set( className, typeInfo );

        }
    }


    static initialize( target: NonNullable<Object>, item?: any )
    {
        if ( item === null || item === undefined ) return;

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {
            
            const typeInfo = Prop.GetTypeInfo( prototype );
            
            Object.entries( typeInfo?.recordPropertyInfo ?? {} ).forEach( ([ propertyName, propertyInfo ]) => {

                if ( initializedProperties.has( propertyName ) ) return;
                if (!(propertyName in item)) return;

                const originalValue = ( target as any )[ propertyName ];
                const value = item[propertyName];


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


                const behavior = propertyInfo.behavior;

                if ( behavior === PropBehavior.string || behavior === PropBehavior.text ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value ) 
                            : Prop.setString( value ) 
                    );
                }
                else if ( behavior === PropBehavior.number ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value ) 
                            : Prop.setNumber( value )
                    );
                }
                else if ( behavior === PropBehavior.boolean ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Boolean( value ) 
                    );
                }
                else if ( behavior === PropBehavior.model ) {
                    const constructorFunction = Prop.GetClass( value );

                    Reflect.set( 
                        target, 
                        propertyName, 
                        constructorFunction 
                            ? new constructorFunction( value ) 
                        : propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                        : {}
                    );
                }
                else if ( behavior === PropBehavior.array ) {
                    Reflect.set(
                        target,
                        propertyName,
                        Array.isArray( value )
                            ? value.map( item =>  {
                                const constructorFunction = Prop.GetClass( item );

                                return constructorFunction 
                                    ? new constructorFunction( item ) 
                                : propertyInfo.getValue 
                                    ? propertyInfo.getValue( item )
                                : {}
                            } )
                            : []
                    );
                }
                else if ( behavior === PropBehavior.date ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setDate( value )
                    );
                }
                else if ( behavior === PropBehavior.time ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setTime( value )
                    );
                }
                else if ( behavior === PropBehavior.datetime ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setDateTime( value )
                    );
                }
                else if ( behavior === PropBehavior.object ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : {}
                    );
                }
                else {
                    Reflect.set( target, propertyName, value );
                }

                initializedProperties.add( propertyName );

            } );

            prototype = Object.getPrototypeOf( prototype );

        }
    }


    static assign( target: NonNullable<Object>, item?: any )
    {
        if ( item === null || item === undefined ) return;

        let prototype = Object.getPrototypeOf( target );
        const initializedProperties = new Set<string>();

        while ( prototype && Object.prototype !== prototype ) {

            const typeInfo = Prop.GetTypeInfo( prototype );

            if ( typeInfo === undefined ) {
                prototype = Object.getPrototypeOf( prototype );
                continue;
            }
            
            const properties = Object.keys( typeInfo.recordPropertyInfo )

            Object.entries( item ).forEach( ([ propertyName, value ]: [string,any]) => {

                if ( initializedProperties.has( propertyName ) ) return;
                if ( !properties.includes( propertyName ) ) return;
                
                const originalValue = ( target as any )[ propertyName ];


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

                const propertyInfo = typeInfo.recordPropertyInfo[ propertyName ];
                const behavior = propertyInfo.behavior;

                if ( behavior === PropBehavior.string || behavior === PropBehavior.text ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value ) 
                            : Prop.setString( value ) 
                    );
                }
                else if ( behavior === PropBehavior.number ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value ) 
                            : Prop.setNumber( value )
                    );
                }
                else if ( behavior === PropBehavior.boolean ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Boolean( value ) 
                    );
                }
                else if ( behavior === PropBehavior.model ) {
                    const constructorFunction = Prop.GetClass( value );

                    Reflect.set( 
                        target, 
                        propertyName, 
                        constructorFunction 
                            ? new constructorFunction( value ) 
                        : propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                        : {}
                    );
                }
                else if ( behavior === PropBehavior.array ) {
                    Reflect.set(
                        target,
                        propertyName,
                        Array.isArray( value )
                            ? value.map( item =>  {
                                const constructorFunction = Prop.GetClass( item );

                                return constructorFunction 
                                    ? new constructorFunction( item ) 
                                : propertyInfo.getValue 
                                    ? propertyInfo.getValue( item )
                                : {}
                            } )
                            : []
                    );
                }
                else if ( behavior === PropBehavior.date ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setDate( value )
                    );
                }
                else if ( behavior === PropBehavior.time ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setTime( value )
                    );
                }
                else if ( behavior === PropBehavior.datetime ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : Prop.setDateTime( value )
                    );
                }
                else if ( behavior === PropBehavior.object ) {
                    Reflect.set( 
                        target, 
                        propertyName, 
                        propertyInfo.getValue 
                            ? propertyInfo.getValue( value )
                            : {}
                    );
                }
                else {
                    Reflect.set( target, propertyName, value );
                }

                initializedProperties.add( propertyName );

            } );

            prototype = Object.getPrototypeOf( prototype );
        }
    }


    static GetTypeInfo( target: any ): TypeInfo | undefined
    {
        try {
            const constructorName = target.prototype?.constructor.type ?? target.constructor.type;
            return this.recordMetadata.get( constructorName );
        }
        catch ( error ) {
            return undefined;
        }
    }


    static toDateTimeNow()
    {
        return DateTime.local();
    }


    static toDateTime( value?: string )
    {
        try {
            if ( value === undefined || value === null ) throw new Error();

            let datetime = DateTime.fromSQL(value);
            if (datetime.isValid) return datetime;

            datetime = DateTime.fromISO(value);
            return datetime.isValid
                ? datetime
                : DateTime.invalid( '-', '-' );
        }
        catch ( error: any ) {
            return DateTime.invalid( '-', '-' );
        }
    }


    static toDuration( value?: string )
    {
        try {
            if ( value === undefined || value === null ) throw new Error();
            const [hours,minutes,seconds] = value.split( ':' ).map( Number );
            return Duration.fromObject({ hours, minutes, seconds });
        }
        catch ( error ) {
            return Duration.invalid( '-', '-' );
        }
    }


    static toInterval( dateTimeInicio: DateTime, dateTimeFinal: DateTime )
    {
        try {
            return Interval.fromDateTimes( dateTimeInicio, dateTimeFinal );
        }
        catch ( error ) {
            return Interval.invalid( '-', '-' );
        }
    }


    static toDecimal( value?: number | string )
    {
        try {
            if ( value === undefined || value === null ) throw new Error();
            const decimalValue = new Decimal( value );
            return decimalValue.isNaN() 
                    ? new Decimal( 0 )
                    : !decimalValue.isFinite()
                        ? new Decimal( 0 )
                        : decimalValue;
        }
        catch ( error ) {
            return new Decimal( 0 );
        }
    }


    static setDate( value: any ): string | undefined
    {
        const datetime = Prop.toDateTime( value );
        return datetime.isValid 
                ? datetime.toSQLDate() 
                : value;
        
    }


    static setDateTime( value: any ): string | undefined
    {
        const datetime = Prop.toDateTime( value );
        return datetime.isValid 
                ? datetime.toSQL()
                : value;
    }


    static setTime( value: any ): string | undefined
    {
        const duration = Prop.toDuration( value );
        return duration.isValid 
                ? duration.toFormat( 'hh:mm:ss' ) 
                : value;
    }


    static setNumber( value: any ): any
    {
        try {
            const decimalValue = new Decimal( value );
            return decimalValue.toNumber();
        } catch ( error ) {
            return value;
        }
    }


    static setNumberStrict( value: any ): number | undefined
    {
        try {
            if ( value === undefined || value === null ) throw new Error();
            const decimalValue = new Decimal( value );
            return decimalValue.isNaN() 
                    ? 0
                    : !decimalValue.isFinite()
                        ? 0
                        : decimalValue.toNumber();
        } catch ( error ) {
            return undefined;
        }
    }


    static setString( value: any ): string | undefined
    {
        if ( value === undefined || value === null ) return undefined;

        const newValue = String( value ).trim();

        return newValue.length === 0 
                ? undefined 
                : newValue;
    }


    static setObject( value: any ): Record<any,any>
    {
        try {

            if ( 
                typeof value === 'object' &&
                value !== undefined &&
                value !== null &&
                !Array.isArray( value )
            ) {
                return {...value};
            }

            throw new Error()

        }
        catch ( error ) {
            return {};
        }
    }
}

export interface TypeInfo
{
    name: string,
    recordPropertyInfo: Record<string, PropertyInfo<any>>
}

export interface PropertyInfo<T>
{
    name: keyof T,
    getValue?: ( value: any ) => Object,
    behavior: string,
}


@Prop.Class()
export class Model
{
    static type = 'Model';
    type = Model.type;

    @Prop.Set() symbol: symbol = Symbol();
    @Prop.Set() id?: number;
    @Prop.Set() uuid?: string;


    constructor( item?: Partial<Model> )
    {
        Prop.initialize( this, item );
    }

    
    set( item: Partial<this> ): this
    {
        Prop.assign( this, item );
        return this;
    }


    setRelation(): this
    {
        return this;
    }
}