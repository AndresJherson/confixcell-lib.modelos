import Decimal from 'decimal.js';
import { Ctor, Model, ModelType, Prop, PropBehavior, Proporcion, TipoProporcion } from '../../../index';
import { DateTime, Interval } from 'luxon';

export interface ICredito {

    importeValorNeto?: number;
    tasaInteresDiario?: number;
    importeInteres?: number;
    porcentajeInteres?: number;
    importeValorFinal?: number;

    get decimalImporteValorNeto(): Decimal;
    get decimalTasaInteresDiario(): Decimal;
    get decimalImporteInteres(): Decimal;
    get decimalPorcentajeInteres(): Decimal;
    get decimalImporteValorFinal(): Decimal;

    cuotas?: Cuota[];

    get decimalDuracionMinutos(): Decimal;
    get interesXminuto(): Proporcion;
    get amortizacionXminuto(): Proporcion;
    get cuotaXminuto(): Proporcion;

    procesarInformacion(): this
    procesarPagos( importeCobrado: number ): this

    agregarCuota( cuota: Cuota ): this;
    actualizarCuota( cuota: Cuota ): this;
    eliminarCuota( cuota: Cuota ): this;
    getCuota( cuota: Cuota ): Cuota | undefined;
}


export function Credito<TBase extends Ctor<any>>( Base: TBase ) {
    return class extends Base implements ICredito {

        importeValorNeto?: number;
        tasaInteresDiario?: number;
        importeInteres?: number;
        porcentajeInteres?: number;
        importeValorFinal?: number;

        get decimalImporteValorNeto() { return Prop.toDecimal( this.importeValorNeto ); }
        get decimalTasaInteresDiario(): Decimal { return Prop.toDecimal( this.tasaInteresDiario ) }
        get decimalImporteInteres(): Decimal { return Prop.toDecimal( this.importeInteres ) }
        get decimalPorcentajeInteres(): Decimal { return Prop.toDecimal( this.porcentajeInteres ) }
        get decimalImporteValorFinal(): Decimal { return Prop.toDecimal( this.importeValorFinal ) }

        cuotas?: Cuota[];

        #decimalDuracionMinutos = new Decimal( 0 );
        #interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
        #amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
        #cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );

        get decimalDuracionMinutos() { return this.#decimalDuracionMinutos; }
        get interesXminuto() { return this.#interesXminuto; }
        get amortizacionXminuto() { return this.#amortizacionXminuto; }
        get cuotaXminuto() { return this.#cuotaXminuto; }



        agregarCuota<C extends Cuota>( cuota: C ): this {
            cuota.fechaInicio = !this.cuotas?.length
                ? ( cuota.fechaInicio ?? Prop.toDateTimeNow().toSQL() )
                : ( cuota.fechaInicio ?? this.cuotas[this.cuotas.length - 1].fechaVencimiento );

            this.cuotas?.push( cuota );

            this.procesarInformacion();

            return this;
        }


        actualizarCuota<C extends Cuota>( cuota: C ): this {
            if ( this.cuotas ) {
                const i = this.cuotas.findIndex( x => x.isSameIdentity( cuota ) );

                if ( i !== -1 ) {
                    this.cuotas[i] = cuota;
                    this.procesarInformacion();
                }
            }

            return this;
        }


        eliminarCuota<C extends Cuota>( cuota: C ): this {
            this.cuotas = this.cuotas?.filter( x => !x.isSameIdentity( cuota ) );
            this.procesarInformacion();
            return this;
        }


        getCuota<C extends Cuota>( cuota: C ): C | undefined {
            if ( !this.cuotas ) return undefined;
            let i = this.cuotas.findIndex( x => x.isSameIdentity( cuota ) );
            return this.cuotas[i] as C;
        }


        procesarInformacion(): this {
            try {

                this.#decimalDuracionMinutos = this.cuotas?.reduce(
                    ( minuto, cuota, i ) => {

                        cuota.numero = i + 1;

                        cuota.fechaInicio = i === 0
                            ? cuota.fechaInicio
                            : ( this.cuotas ? this.cuotas[i - 1].fechaVencimiento : undefined );

                        return minuto.plus( cuota.calcularDuracion().duracionMinutos ?? 0 )

                    },
                    new Decimal( 0 )
                ) ?? new Decimal( 0 );


                try {
                    this.#interesXminuto.antecedente = this.decimalTasaInteresDiario
                        .div( 1440 )
                        .div( 100 )
                        .mul( this.decimalImporteValorNeto )
                        .toNumber();

                    this.#interesXminuto.consecuente = 1;
                }
                catch ( error ) {
                    this.#interesXminuto.antecedente = 0;
                    this.#interesXminuto.consecuente = 0;
                }


                try {
                    this.#amortizacionXminuto.antecedente = this.decimalImporteValorNeto
                        .div( this.#decimalDuracionMinutos )
                        .toNumber();

                    this.#amortizacionXminuto.consecuente = 1;
                }
                catch ( error ) {
                    this.#amortizacionXminuto.antecedente = 0;
                    this.#amortizacionXminuto.consecuente = 0;
                }


                this.#cuotaXminuto.antecedente = new Decimal( this.#amortizacionXminuto.antecedente )
                    .plus( this.#interesXminuto.antecedente )
                    .toNumber();
                this.#cuotaXminuto.consecuente = 1;


                this.importeInteres = this.#interesXminuto.calcularAntecedente( this.#decimalDuracionMinutos.toNumber() )
                    .toDecimalPlaces( 2 )
                    .toNumber();

                this.porcentajeInteres = this.decimalImporteInteres
                    .div( this.decimalImporteValorNeto )
                    .mul( 100 )
                    .toDecimalPlaces( 2 )
                    .toNumber();

                this.importeValorFinal = this.decimalImporteValorNeto
                    .plus( this.importeInteres )
                    .toDecimalPlaces( 2 )
                    .toNumber();

                this.calcularCuotas();

                const cuotasLength = this.cuotas?.length ?? 0;
                const ultimaCuota = this.cuotas ? this.cuotas[cuotasLength - 1] : undefined;
                if (
                    cuotasLength > 1 &&
                    ultimaCuota &&
                    ultimaCuota.importeSaldo !== 0
                ) {

                    ultimaCuota.importeAmortizacion = this.cuotas ? this.cuotas[cuotasLength - 2].importeSaldo : undefined;
                    ultimaCuota.importeCuota = ultimaCuota.decimalImporteAmortizacion
                        .plus( ultimaCuota.importeInteres ?? 0 )
                        .toDecimalPlaces( 2 )
                        .toNumber();
                    ultimaCuota.importeSaldo = 0;

                }


            }
            catch ( error ) {
                throw new Error( 'Error al calcular el this' );
            }


            return this;
        }


        calcularCuotas(): this {
            try {
                this.cuotas?.forEach( ( cuota, i ) => {

                    cuota.importeAmortizacion = this.#amortizacionXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
                        .toDecimalPlaces( 2 )
                        .toNumber();

                    cuota.importeInteres = this.#interesXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
                        .toDecimalPlaces( 2 )
                        .toNumber();

                    cuota.importeCuota = cuota.decimalImporteAmortizacion
                        .plus( cuota.importeInteres )
                        .toDecimalPlaces( 2 )
                        .toNumber();

                    cuota.importeSaldo = i === 0
                        ? this.decimalImporteValorNeto
                            .minus( cuota.importeAmortizacion )
                            .toDecimalPlaces( 2 )
                            .toNumber()
                        : (
                            this.cuotas
                                ? this.cuotas[i - 1].decimalImporteSaldo
                                    .minus( cuota.importeAmortizacion )
                                    .toDecimalPlaces( 2 )
                                    .toNumber()
                                : undefined
                        )


                    cuota.importeMora = 0;


                    if ( !cuota.esActivoMora ) return;

                    const interval = Interval.fromDateTimes( Prop.toDateTime( cuota.fechaVencimiento ), Prop.toDateTime( cuota.fechaLimiteMora ) );
                    const minutos = interval.isValid
                        ? interval.length( 'minutes' )
                        : 0;

                    cuota.importeMora = this.#interesXminuto.calcularAntecedente( minutos )
                        .toDecimalPlaces( 2 )
                        .toNumber();

                } );
            }
            catch ( error ) {
                throw new Error( 'Error al calcular cuotas' );
            }

            return this;
        }


        procesarPagos( importeCobrado: number ): this {
            try {

                let saldoCobrado = importeCobrado;

                this.cuotas?.forEach( cuota => {

                    const decimalSaldoCobrado = new Decimal( saldoCobrado );
                    saldoCobrado = decimalSaldoCobrado
                        .minus( cuota.importeCuota ?? 0 )
                        .toNumber();

                    if ( saldoCobrado > 0 ) {

                        cuota.importeCobrado = cuota.importeCuota;
                        cuota.importePorCobrar = 0;
                        cuota.porcentajeCobrado = 100.00;
                        cuota.porcentajePorCobrar = 0.00;

                    }
                    else {

                        cuota.importeCobrado = decimalSaldoCobrado
                            .toDecimalPlaces( 2 )
                            .toNumber();

                        cuota.importePorCobrar = cuota.decimalImporteCuota
                            .minus( decimalSaldoCobrado )
                            .toDecimalPlaces( 2 )
                            .toNumber();

                        try {
                            cuota.porcentajeCobrado = decimalSaldoCobrado
                                .div( cuota.importeCuota ?? 0 )
                                .mul( 100 )
                                .toDecimalPlaces( 2 )
                                .toNumber();

                            cuota.porcentajePorCobrar = new Decimal( 100.00 )
                                .minus( cuota.porcentajeCobrado )
                                .toDecimalPlaces( 2 )
                                .toNumber();

                        }
                        catch ( error ) {
                            cuota.porcentajeCobrado = 0;
                            cuota.porcentajePorCobrar = 0;
                        }

                    }

                } );

            }
            catch ( error: any ) {
                throw new Error( 'Error al calcular importes cobrados del Crédito' );
            }

            return this;
        }
    }
}


// export interface ICredito {
//     importeValorNeto?: number;
//     tasaInteresDiario?: number;
//     importeInteres?: number;
//     porcentajeInteres?: number;
//     importeValorFinal?: number;

//     get decimalImporteValorNeto(): Decimal;
//     get decimalTasaInteresDiario(): Decimal;
//     get decimalImporteInteres(): Decimal;
//     get decimalPorcentajeInteres(): Decimal;
//     get decimalImporteValorFinal(): Decimal;

//     cuotas?: Cuota[];

//     duracionMinutos?: number;
//     interesXminuto: Proporcion;
//     amortizacionXminuto: Proporcion;
//     cuotaXminuto: Proporcion;
//     credito: Credito;
//     get decimalDuracionMinutos(): Decimal;

//     procesarInformacion(): this
//     procesarPagos( importeCobrado: number ): this

//     agregarCuota( cuota: Cuota ): this;
//     actualizarCuota( cuota: Cuota ): this;
//     eliminarCuota( cuota: Cuota ): this;
//     getCuota( cuota: Cuota ): Cuota | undefined;
// }


// export class Credito {
//     agregarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T {
//         cuota.fechaInicio = !credito.cuotas?.length
//             ? ( cuota.fechaInicio ?? Prop.toDateTimeNow().toSQL() )
//             : ( cuota.fechaInicio ?? credito.cuotas[credito.cuotas.length - 1].fechaVencimiento );

//         credito.cuotas?.push( cuota );

//         credito.procesarInformacion();

//         return credito;
//     }


//     actualizarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T {
//         if ( credito.cuotas ) {
//             const i = credito.cuotas.findIndex( x => x.isSameIdentity( cuota ) );

//             if ( i !== -1 ) {
//                 credito.cuotas[i] = cuota;
//                 credito.procesarInformacion();
//             }
//         }

//         return credito;
//     }


//     eliminarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T {
//         credito.cuotas = credito.cuotas?.filter( x => !x.isSameIdentity( cuota ) );
//         credito.procesarInformacion();
//         return credito;
//     }


//     getCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): C | undefined {
//         if ( !credito.cuotas ) return undefined;
//         let i = credito.cuotas.findIndex( x => x.isSameIdentity( cuota ) );
//         return credito.cuotas[i] as C;
//     }


//     procesarInformacion<T extends ICredito>( credito: T ): T {
//         try {

//             credito.duracionMinutos = credito.cuotas?.reduce(
//                 ( minuto, cuota, i ) => {

//                     cuota.numero = i + 1;

//                     cuota.fechaInicio = i === 0
//                         ? cuota.fechaInicio
//                         : ( credito.cuotas ? credito.cuotas[i - 1].fechaVencimiento : undefined );

//                     return minuto.plus( cuota.calcularDuracion().duracionMinutos ?? 0 )

//                 },
//                 new Decimal( 0 )
//             )
//                 .toDecimalPlaces( 2 )
//                 .toNumber();


//             try {
//                 credito.interesXminuto.antecedente = credito.decimalTasaInteresDiario
//                     .div( 1440 )
//                     .div( 100 )
//                     .mul( credito.decimalImporteValorNeto )
//                     .toNumber();

//                 credito.interesXminuto.consecuente = 1;
//             }
//             catch ( error ) {
//                 credito.interesXminuto.antecedente = 0;
//                 credito.interesXminuto.consecuente = 0;
//             }


//             try {
//                 credito.amortizacionXminuto.antecedente = credito.decimalImporteValorNeto
//                     .div( credito.duracionMinutos ?? 0 )
//                     .toNumber();

//                 credito.amortizacionXminuto.consecuente = 1;
//             }
//             catch ( error ) {
//                 credito.amortizacionXminuto.antecedente = 0;
//                 credito.amortizacionXminuto.consecuente = 0;
//             }


//             credito.cuotaXminuto.antecedente = new Decimal( credito.amortizacionXminuto.antecedente )
//                 .plus( credito.interesXminuto.antecedente )
//                 .toNumber();
//             credito.cuotaXminuto.consecuente = 1;


//             credito.importeInteres = credito.interesXminuto.calcularAntecedente( credito.duracionMinutos ?? 0 )
//                 .toDecimalPlaces( 2 )
//                 .toNumber();

//             credito.porcentajeInteres = credito.decimalImporteInteres
//                 .div( credito.decimalImporteValorNeto )
//                 .mul( 100 )
//                 .toDecimalPlaces( 2 )
//                 .toNumber();

//             credito.importeValorFinal = credito.decimalImporteValorNeto
//                 .plus( credito.importeInteres )
//                 .toDecimalPlaces( 2 )
//                 .toNumber();

//             this.calcularCuotas( credito );

//             const cuotasLength = credito.cuotas?.length ?? 0;
//             const ultimaCuota = credito.cuotas ? credito.cuotas[cuotasLength - 1] : undefined;
//             if (
//                 cuotasLength > 1 &&
//                 ultimaCuota &&
//                 ultimaCuota.importeSaldo !== 0
//             ) {

//                 ultimaCuota.importeAmortizacion = credito.cuotas ? credito.cuotas[cuotasLength - 2].importeSaldo : undefined;
//                 ultimaCuota.importeCuota = ultimaCuota.decimalImporteAmortizacion
//                     .plus( ultimaCuota.importeInteres ?? 0 )
//                     .toDecimalPlaces( 2 )
//                     .toNumber();
//                 ultimaCuota.importeSaldo = 0;

//             }


//         }
//         catch ( error ) {
//             throw new Error( 'Error al calcular el credito' );
//         }


//         return credito;
//     }


//     private calcularCuotas<T extends ICredito>( credito: T ): T {
//         try {
//             credito.cuotas?.forEach( ( cuota, i ) => {

//                 cuota.importeAmortizacion = credito.amortizacionXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
//                     .toDecimalPlaces( 2 )
//                     .toNumber();

//                 cuota.importeInteres = credito.interesXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
//                     .toDecimalPlaces( 2 )
//                     .toNumber();

//                 cuota.importeCuota = cuota.decimalImporteAmortizacion
//                     .plus( cuota.importeInteres )
//                     .toDecimalPlaces( 2 )
//                     .toNumber();

//                 cuota.importeSaldo = i === 0
//                     ? credito.decimalImporteValorNeto
//                         .minus( cuota.importeAmortizacion )
//                         .toDecimalPlaces( 2 )
//                         .toNumber()
//                     : (
//                         credito.cuotas
//                             ? credito.cuotas[i - 1].decimalImporteSaldo
//                                 .minus( cuota.importeAmortizacion )
//                                 .toDecimalPlaces( 2 )
//                                 .toNumber()
//                             : undefined
//                     )


//                 cuota.importeMora = 0;


//                 if ( !cuota.esActivoMora ) return;

//                 const interval = Interval.fromDateTimes( Prop.toDateTime( cuota.fechaVencimiento ), Prop.toDateTime( cuota.fechaLimiteMora ) );
//                 const minutos = interval.isValid
//                     ? interval.length( 'minutes' )
//                     : 0;

//                 cuota.importeMora = credito.interesXminuto.calcularAntecedente( minutos )
//                     .toDecimalPlaces( 2 )
//                     .toNumber();

//             } );
//         }
//         catch ( error ) {
//             throw new Error( 'Error al calcular cuotas' );
//         }

//         return credito;
//     }


//     procesarPagos<T extends ICredito>( credito: T, importeCobrado: number ): T {
//         try {

//             let saldoCobrado = importeCobrado;

//             credito.cuotas?.forEach( cuota => {

//                 const decimalSaldoCobrado = new Decimal( saldoCobrado );
//                 saldoCobrado = decimalSaldoCobrado
//                     .minus( cuota.importeCuota ?? 0 )
//                     .toNumber();

//                 if ( saldoCobrado > 0 ) {

//                     cuota.importeCobrado = cuota.importeCuota;
//                     cuota.importePorCobrar = 0;
//                     cuota.porcentajeCobrado = 100.00;
//                     cuota.porcentajePorCobrar = 0.00;

//                 }
//                 else {

//                     cuota.importeCobrado = decimalSaldoCobrado
//                         .toDecimalPlaces( 2 )
//                         .toNumber();

//                     cuota.importePorCobrar = cuota.decimalImporteCuota
//                         .minus( decimalSaldoCobrado )
//                         .toDecimalPlaces( 2 )
//                         .toNumber();

//                     try {
//                         cuota.porcentajeCobrado = decimalSaldoCobrado
//                             .div( cuota.importeCuota ?? 0 )
//                             .mul( 100 )
//                             .toDecimalPlaces( 2 )
//                             .toNumber();

//                         cuota.porcentajePorCobrar = new Decimal( 100.00 )
//                             .minus( cuota.porcentajeCobrado )
//                             .toDecimalPlaces( 2 )
//                             .toNumber();

//                     }
//                     catch ( error ) {
//                         cuota.porcentajeCobrado = 0;
//                         cuota.porcentajePorCobrar = 0;
//                     }

//                 }

//             } );

//         }
//         catch ( error: any ) {
//             throw new Error( 'Error al calcular importes cobrados del Crédito' );
//         }

//         return credito;
//     }
// }


@Prop.Class()
export class Cuota extends Model {

    static override type = ModelType.Cuota;
    override type = ModelType.Cuota;

    @Prop.Set() numero?: number;
    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaVencimiento?: string;

    get decimalNumero(): Decimal {
        return Prop.toDecimal( this.numero );
    }
    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeVencimiento(): DateTime {
        return Prop.toDateTime( this.fechaVencimiento );
    }

    @Prop.Set() duracionMinutos?: number;
    @Prop.Set() importeInteres?: number;
    @Prop.Set() importeAmortizacion?: number;
    @Prop.Set() importeCuota?: number;
    @Prop.Set() importeSaldo?: number;

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }
    get decimalImporteInteres(): Decimal {
        return Prop.toDecimal( this.importeInteres );
    }
    get decimalImporteAmortizacion(): Decimal {
        return Prop.toDecimal( this.importeAmortizacion );
    }
    get decimalImporteCuota(): Decimal {
        return Prop.toDecimal( this.importeCuota );
    }
    get decimalImporteSaldo(): Decimal {
        return Prop.toDecimal( this.importeSaldo );
    }

    @Prop.Set() esActivoMora: boolean = false;
    @Prop.Set( PropBehavior.datetime ) fechaLimiteMora?: string;
    @Prop.Set() importeMora?: number;
    @Prop.Set() importeCobrado?: number;
    @Prop.Set() importePorCobrar?: number;
    @Prop.Set() porcentajeCobrado?: number;
    @Prop.Set() porcentajePorCobrar?: number;

    get dateTimeLimiteMora(): DateTime {
        return Prop.toDateTime( this.fechaLimiteMora );
    }
    get decimalImporteMora(): Decimal {
        return Prop.toDecimal( this.importeMora );
    }
    get decimalImporteCobrado(): Decimal {
        return Prop.toDecimal( this.importeCobrado );
    }
    get decimalImportePorCobrar(): Decimal {
        return Prop.toDecimal( this.importePorCobrar );
    }
    get decimalPorcentajeCobrado(): Decimal {
        return Prop.toDecimal( this.porcentajeCobrado );
    }
    get decimalPorcentajePorCobrar(): Decimal {
        return Prop.toDecimal( this.porcentajePorCobrar );
    }


    constructor( item?: Partial<Cuota> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<Cuota> ): this {
        return super.set( item as Partial<this> );
    }


    calcularDuracion(): this {
        try {

            const dateTimeInicio = Prop.toDateTime( this.fechaInicio );
            const dateTimeFinal = Prop.toDateTime( this.fechaVencimiento );
            const interval = Interval.fromDateTimes( dateTimeInicio, dateTimeFinal );

            this.duracionMinutos = interval.isValid
                ? interval.length( 'minutes' )
                : 0;

        }
        catch ( error ) {
            throw new Error( `Error al calcular cuota Nº ${this.numero}` );
        }

        return this;
    }
}