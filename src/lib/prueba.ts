import Decimal from 'decimal.js';
import { Cuota, EntradaEfectivo, EntradaEfectivoCredito, Model, ModelType, Prop, Proporcion, SalidaEfectivo, TipoProporcion } from '../index';
import { Interval } from 'luxon';

const a = new EntradaEfectivoCredito( {

} )





// 

type Ctor<T = {}> = new ( ...args: any[] ) => T;


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





// export class EntradaEfectivoCredito extends EntradaEfectivo implements ICredito {
export class EntradaEfectivoCredito extends EntradaEfectivo {

    static override type: string = ModelType.EntradaEfectivoCredito;
    override type = ModelType.EntradaEfectivoCredito;

    @Prop.Set() tasaInteresDiario?: number;
    @Prop.Set() importeInteres?: number;
    @Prop.Set() porcentajeInteres?: number;
    @Prop.Set() importeValorFinal?: number;

    get decimalTasaInteresDiario(): Decimal { return Prop.toDecimal( this.tasaInteresDiario ) }
    get decimalImporteInteres(): Decimal { return Prop.toDecimal( this.importeInteres ) }
    get decimalPorcentajeInteres(): Decimal { return Prop.toDecimal( this.porcentajeInteres ) }
    get decimalImporteValorFinal(): Decimal { return Prop.toDecimal( this.importeValorFinal ) }

    @Prop.Set( PropBehavior.array, x => new EntradaEfectivoCuota( x ) ) cuotas?: EntradaEfectivoCuota[];

    duracionMinutos?: number;
    interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    credito = new Credito();

    get decimalDuracionMinutos(): Decimal { return Prop.toDecimal( this.duracionMinutos ) }


    constructor( item?: Partial<EntradaEfectivoCredito> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<EntradaEfectivoCredito> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.cuotas?.forEach( cuota =>
            cuota.set( {
                credito: new EntradaEfectivoCredito( { id: this.id, uuid: this.uuid, symbol: this.symbol } )
            } )
                .setRelation()
        );

        return this;
    }


    // agregarCuota( cuota: EntradaEfectivoCuota ): this {
    //     return this.credito.agregarCuota( this, cuota );
    // }


    // actualizarCuota( cuota: EntradaEfectivoCuota ): this {
    //     return this.credito.actualizarCuota( this, cuota );
    // }


    // eliminarCuota( cuota: EntradaEfectivoCuota ): this {
    //     return this.credito.eliminarCuota( this, cuota );
    // }


    // getCuota( cuota: EntradaEfectivoCuota ): EntradaEfectivoCuota | undefined {
    //     return this.credito.getCuota( this, cuota );
    // }


    // override procesarInformacion(): this {
    //     return this.credito.procesarInformacion( this );
    // }


    // procesarPagos( importeCobrado: number ): this {
    //     return this.credito.procesarPagos( this, importeCobrado );
    // }
}

