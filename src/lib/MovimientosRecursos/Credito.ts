import Decimal from "decimal.js";
import { Proporcion, TipoProporcion, ModelType, Model, OptionalModel, Cuota, Cast, Prop, PropBehavior, ExecutionContext } from '../../index';
import { DateTime, Interval } from "luxon";


export interface ICredito<TCuota extends Cuota> extends Model {

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

    cuotas?: TCuota[];

    get decimalDuracionMinutos(): Decimal;
    get interesXminuto(): Proporcion;
    get amortizacionXminuto(): Proporcion;
    get cuotaXminuto(): Proporcion;

    agregarCuota( cuota: TCuota ): this;
    actualizarCuota( cuota: TCuota ): this;
    eliminarCuota( cuota: TCuota ): this;
    getCuota( cuota: TCuota ): TCuota | undefined;

    procesarCredito(): this;
    procesarPagos( importeCobrado: number ): this;
}


@Prop.Class()
export class Credito<TCuota extends Cuota> extends Model implements ICredito<TCuota> {

    static override type = ModelType.Credito;
    override type = ModelType.Credito;

    @Prop.Set( { extends: true } ) importeValorNeto?: number;
    @Prop.Set( { extends: true } ) tasaInteresDiario?: number;
    @Prop.Set( { extends: true } ) importeInteres?: number;
    @Prop.Set( { extends: true } ) porcentajeInteres?: number;
    @Prop.Set( { extends: true } ) importeValorFinal?: number;

    @Prop.Set( { extends: true } ) get decimalImporteValorNeto(): Decimal { return Cast.toDecimal( this.importeValorNeto ) }
    @Prop.Set( { extends: true } ) get decimalTasaInteresDiario(): Decimal { return Cast.toDecimal( this.tasaInteresDiario ) }
    @Prop.Set( { extends: true } ) get decimalImporteInteres(): Decimal { return Cast.toDecimal( this.importeInteres ) }
    @Prop.Set( { extends: true } ) get decimalPorcentajeInteres(): Decimal { return Cast.toDecimal( this.porcentajeInteres ) }
    @Prop.Set( { extends: true } ) get decimalImporteValorFinal(): Decimal { return Cast.toDecimal( this.importeValorFinal ) }

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => Cuota.initialize( [x] )[0], extends: true } ) cuotas?: TCuota[];

    #decimalDuracionMinutos = new Decimal( 0 );
    #interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    #amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    #cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );

    @Prop.Set( { extends: true } ) get decimalDuracionMinutos() { return this.#decimalDuracionMinutos; }
    @Prop.Set( { extends: true } ) get interesXminuto() { return this.#interesXminuto; }
    @Prop.Set( { extends: true } ) get amortizacionXminuto() { return this.#amortizacionXminuto; }
    @Prop.Set( { extends: true } ) get cuotaXminuto() { return this.#cuotaXminuto; }


    constructor( item?: OptionalModel<Credito<TCuota>> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Credito<TCuota>> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Credito<TCuota>> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, Credito.type, () => {
            
            this.cuotas?.forEach( item => item.assign( {
                credito: this
            } ).setRelation( context ) )

        } );

        return this;
    }


    static initialize<TCuota extends Cuota>( data: OptionalModel<ICredito<TCuota>>[] ): ICredito<TCuota>[] {
        return data.map( item => new ( Prop.getClass<ICredito<TCuota>>( item ) ?? Credito )( item ) )
    }


    agregarCuota( cuota: TCuota ): this {
        this.cuotas ??= [];

        cuota.fechaInicio = !this.cuotas?.length
            ? ( cuota.fechaInicio ?? DateTime.local().toSQL() )
            : ( cuota.fechaInicio ?? this.cuotas[this.cuotas.length - 1].fechaVencimiento );

        this.cuotas.push( cuota );

        this.procesarCredito();

        return this;
    }


    actualizarCuota( cuota: TCuota ): this {
        if ( this.cuotas ) {
            const i = this.cuotas.findIndex( x => x.isSameIdentity( cuota ) );

            if ( i !== -1 ) {
                this.cuotas[i] = cuota;
                this.procesarCredito();
            }
        }

        return this;
    }


    eliminarCuota( cuota: TCuota ): this {
        this.cuotas = this.cuotas?.filter( x => !x.isSameIdentity( cuota ) );
        this.procesarCredito();
        return this;
    }


    getCuota( cuota: TCuota ): TCuota | undefined {
        if ( !this.cuotas ) return undefined;
        let i = this.cuotas.findIndex( x => x.isSameIdentity( cuota ) );
        return this.cuotas[i];
    }


    procesarCredito(): this {
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

            this.procesarCuotas();

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


    private procesarCuotas(): this {
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

                const interval = Interval.fromDateTimes( Cast.toDateTime( cuota.fechaVencimiento ), Cast.toDateTime( cuota.fechaLimiteMora ) );
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