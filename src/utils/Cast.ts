import Decimal from "decimal.js";
import { DateTime, Duration, Interval } from "luxon";
import { Model, Utility, UtilPropertyDescriptor } from './../index';
import { ClassType, Immutable } from "./Immutable";

export class Cast extends Utility {

    static toDateTime( value?: unknown ) {
        try {
            if ( !(typeof value === 'string') ) throw new Error();

            let datetime = DateTime.fromSQL( value );
            if ( datetime.isValid ) return datetime;

            datetime = DateTime.fromISO( value );
            return datetime.isValid
                ? datetime
                : DateTime.invalid( '-', '-' );
        }
        catch ( error: unknown ) {
            return DateTime.invalid( '-', '-' );
        }
    }

    static toDuration( value?: string | null ) {
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


    static toDecimal( value?: number | string | null ) {
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


    static setDate( value: any ): string | undefined | null {
        const datetime = Cast.toDateTime( value );
        return datetime.isValid
            ? datetime.toSQLDate()
            : value;

    }


    static setDateTime( value: any ): string | undefined | null {
        const datetime = Cast.toDateTime( value );
        return datetime.isValid
            ? datetime.toSQL()
            : value;
    }


    static setTime( value: any ): string | undefined | null {
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


    static setNumberStrict( value?: unknown ): number | undefined {
        try {
            if ( value === undefined || value === null ) throw new Error();
            const decimalValue = new Decimal( value as any );
            return decimalValue.isNaN()
                ? 0
                : !decimalValue.isFinite()
                    ? 0
                    : decimalValue.toNumber();
        } catch ( error ) {
            return undefined;
        }
    }


    static setString( value?: unknown ): string | undefined {
        if ( value === undefined || value === null ) return undefined;

        const newValue = String( value ).trim();

        return newValue.length === 0
            ? undefined
            : newValue;
    }


    static setObject( value: unknown ): Record<any, any> | undefined {
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


    static arrayToRecordByUuid<T extends object & { uuid?: string | null }>( data: T[] ): Record<string, T> {

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


    static modelToJson<T extends Model>( model: T ): Record<string, any> {
        const ctor = model.constructor as new ( ...args: any[] ) => T;
        const obj = new ctor( model );
        const result: Record<string, any> = {};

        // Función auxiliar para procesar valores
        const processValue = ( value: any ): any => {
            if ( value === null || value === undefined ) {
                return value;
            }

            // Si es instancia de Model, usar su método toJSON
            if ( value instanceof Model ) {
                return Cast.modelToJson( value );
            }

            // Si es un array, procesar cada elemento
            if ( Array.isArray( value ) ) {
                return value.map( item => processValue( item ) );
            }

            // Si es un objeto plano, procesar sus propiedades
            if ( typeof value === 'object' && value.constructor === Object ) {
                const objResult: Record<string, any> = {};
                for ( const [key, val] of Object.entries( value ) ) {
                    objResult[key] = processValue( val );
                }
                return objResult;
            }

            // Para tipos primitivos, devolverlo tal como está
            return value;
        };

        // Procesar propiedades leibles
        for ( const key of UtilPropertyDescriptor.getReadablePropertyNames( obj ) ) {
            const value = ( obj as any )[key];
            result[key] = processValue( value );
        }

        // Recorrer la cadena de prototipos
        let proto = Object.getPrototypeOf( obj );
        while ( proto && proto !== Object.prototype ) {
            const typeInfo = ClassType.getTypeInfo( proto );
            for ( const [propertyName] of Object.entries( typeInfo?.recordPropertyInfo ?? {} ) ) {
                if ( !( propertyName in result ) ) {
                    const value = ( obj as any )[propertyName];
                    result[propertyName] = processValue( value );
                }
            }
            proto = Object.getPrototypeOf( proto );
        }

        return result;
    }
}