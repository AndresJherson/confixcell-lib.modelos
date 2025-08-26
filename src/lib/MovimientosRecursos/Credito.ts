import Decimal from "decimal.js";
import { Proporcion, TipoProporcion, ModelType, Model, OptionalModel, Cuota, Cast, Prop, PropBehavior, ExecutionContext } from '../../index';
import { DateTime, Interval } from "luxon";


export interface ICredito<TCuota extends Cuota> extends Model {

    importeValorNeto?: number | null;
    tasaInteresDiario?: number | null;
    importeInteres?: number | null;
    porcentajeInteres?: number | null;
    importeValorFinal?: number | null;

    get decimalImporteValorNeto(): Decimal;
    get decimalTasaInteresDiario(): Decimal;
    get decimalImporteInteres(): Decimal;
    get decimalPorcentajeInteres(): Decimal;
    get decimalImporteValorFinal(): Decimal;

    cuotas?: TCuota[] | null;

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

    static override type: string = ModelType.Credito;
    override type: string = ModelType.Credito;

    private readonly context?: ICredito<TCuota>;

    #importeValorNeto?: number | null | undefined;
    @Prop.Set()
    public get importeValorNeto(): number | null | undefined { return this.context ? this.context.importeValorNeto : this.#importeValorNeto; }
    public set importeValorNeto( value: number | null | undefined ) { this.context ? this.context.importeValorNeto = value : this.#importeValorNeto = value; }

    #tasaInteresDiario?: number | null | undefined;
    @Prop.Set()
    public get tasaInteresDiario(): number | null | undefined { return this.context ? this.context.tasaInteresDiario : this.#tasaInteresDiario; }
    public set tasaInteresDiario( value: number | null | undefined ) { this.context ? this.context.tasaInteresDiario = value : this.#tasaInteresDiario = value; }

    #importeInteres?: number | null | undefined;
    @Prop.Set()
    public get importeInteres(): number | null | undefined { return this.context ? this.context.importeInteres : this.#importeInteres; }
    public set importeInteres( value: number | null | undefined ) { this.context ? this.context.importeInteres = value : this.#importeInteres = value; }

    #porcentajeInteres?: number | null | undefined;
    @Prop.Set()
    public get porcentajeInteres(): number | null | undefined { return this.context ? this.context.porcentajeInteres : this.#porcentajeInteres; }
    public set porcentajeInteres( value: number | null | undefined ) { this.context ? this.context.porcentajeInteres = value : this.#porcentajeInteres = value; }

    #importeValorFinal?: number | null | undefined;
    @Prop.Set()
    public get importeValorFinal(): number | null | undefined { return this.context ? this.context.importeValorFinal : this.#importeValorFinal; }
    public set importeValorFinal( value: number | null | undefined ) { this.context ? this.context.importeValorFinal = value : this.#importeValorFinal = value; }

    get decimalImporteValorNeto(): Decimal { return Cast.toDecimal( this.importeValorNeto ) }
    get decimalTasaInteresDiario(): Decimal { return Cast.toDecimal( this.tasaInteresDiario ) }
    get decimalImporteInteres(): Decimal { return Cast.toDecimal( this.importeInteres ) }
    get decimalPorcentajeInteres(): Decimal { return Cast.toDecimal( this.porcentajeInteres ) }
    get decimalImporteValorFinal(): Decimal { return Cast.toDecimal( this.importeValorFinal ) }

    #cuotas?: TCuota[] | null | undefined;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => Cuota.initialize( [x] )[0] } )
    public get cuotas(): TCuota[] | null | undefined { return this.context ? this.context.cuotas : this.#cuotas; }
    public set cuotas( value: TCuota[] | null | undefined ) { this.context ? this.context.cuotas = value : this.#cuotas = value; }

    #decimalDuracionMinutos = new Decimal( 0 );
    #interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    #amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    #cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );

    get decimalDuracionMinutos() { return this.#decimalDuracionMinutos; }
    get interesXminuto() { return this.#interesXminuto; }
    get amortizacionXminuto() { return this.#amortizacionXminuto; }
    get cuotaXminuto() { return this.#cuotaXminuto; }


    constructor( item?: OptionalModel<ICredito<TCuota>>, context?: ICredito<TCuota> ) {
        super();
        this.context = context;
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


    static override initialize<TCuota extends Cuota, TModel extends Model, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( Credito<TCuota>, data );
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