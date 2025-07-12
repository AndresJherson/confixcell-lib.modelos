import Decimal from "decimal.js";
import { DateTime, Duration, Interval } from "luxon";

export class Cast {

    static toDateTime( value?: string ) {
        try {
            if ( value === undefined || value === null ) throw new Error();

            let datetime = DateTime.fromSQL( value );
            if ( datetime.isValid ) return datetime;

            datetime = DateTime.fromISO( value );
            return datetime.isValid
                ? datetime
                : DateTime.invalid( '-', '-' );
        }
        catch ( error: any ) {
            return DateTime.invalid( '-', '-' );
        }
    }

    static toDuration( value?: string ) {
        try {
            if ( value === undefined || value === null ) throw new Error();
            const [hours, minutes, seconds] = value.split( ':' ).map( Number );
            return Duration.fromObject( { hours, minutes, seconds } );
        }
        catch ( error ) {
            return Duration.invalid( '-', '-' );
        }
    }


    static toInterval( dateTimeInicio: DateTime, dateTimeFinal: DateTime ) {
        try {
            return Interval.fromDateTimes( dateTimeInicio, dateTimeFinal );
        }
        catch ( error ) {
            return Interval.invalid( '-', '-' );
        }
    }


    static toDecimal( value?: number | string ) {
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


    static setDate( value: any ): string | undefined {
        const datetime = Cast.toDateTime( value );
        return datetime.isValid
            ? datetime.toSQLDate()
            : value;

    }


    static setDateTime( value: any ): string | undefined {
        const datetime = Cast.toDateTime( value );
        return datetime.isValid
            ? datetime.toSQL()
            : value;
    }


    static setTime( value: any ): string | undefined {
        const duration = Cast.toDuration( value );
        return duration.isValid
            ? duration.toFormat( 'hh:mm:ss' )
            : value;
    }


    static setNumber( value: any ): any {
        try {
            const decimalValue = new Decimal( value );
            return decimalValue.toNumber();
        } catch ( error ) {
            return value;
        }
    }


    static setNumberStrict( value: any ): number | undefined {
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


    static setString( value: any ): string | undefined {
        if ( value === undefined || value === null ) return undefined;

        const newValue = String( value ).trim();

        return newValue.length === 0
            ? undefined
            : newValue;
    }


    static setObject( value: any ): Record<any, any> | undefined {
        if ( value === undefined || value === null ) return undefined;

        try {

            if (
                typeof value === 'object' &&
                !Array.isArray( value )
            ) {
                return { ...value };
            }

            throw new Error()

        }
        catch ( error ) {
            return {};
        }
    }


    static toRecordByUuid<T extends object>( data: ( T & { uuid?: string } )[] ): Record<string, T> {

        return data.reduce(
            ( record, item ) => {
                if ( item.uuid ) record[item.uuid] = item;
                return record;
            },
            {} as Record<string, T>
        )
    }


    static jsonReplacer() {
        const seen = new WeakSet();
        return function ( _key: string, value: any ) {
            if ( typeof value === "object" && value !== null ) {
                if ( seen.has( value ) ) {
                    return undefined; // omitir la referencia recursiva
                }
                seen.add( value );
            }
            return value;
        };
    }


    static deepClone<T extends object>( obj: T ): T {
        const visited = new WeakMap<object, any>();

        function _clone( value: any ): any {
            if ( value === null || typeof value !== 'object' ) return value;
            if ( visited.has( value ) ) return undefined;

            const clone = Object.create( Object.getPrototypeOf( value ) );
            visited.set( value, clone );

            for ( const key of Reflect.ownKeys( value ) ) {
                const descriptor = Object.getOwnPropertyDescriptor( value, key );
                if ( !descriptor ) continue;

                // Clonar la propiedad recursivamente
                if ( 'value' in descriptor ) {
                    // Data descriptor (value/writable)
                    Object.defineProperty( clone, key, {
                        value: _clone( ( value as any )[key as any] ),
                        writable: descriptor.writable,
                        enumerable: descriptor.enumerable,
                        configurable: descriptor.configurable
                    } );
                } else {
                    // Accessor descriptor (get/set)
                    Object.defineProperty( clone, key, {
                        get: descriptor.get,
                        set: descriptor.set,
                        enumerable: descriptor.enumerable,
                        configurable: descriptor.configurable
                    } );
                }
            }

            return clone;
        }

        return _clone( obj );
    }


}