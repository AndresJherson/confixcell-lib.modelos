import Decimal from 'decimal.js';
import { Credito, NotaIngresoCuota, Prop, PropBehavior, SalidaEfectivo, ModelType, NotaIngreso, ICredito, OptionalModel, SalidaRecurso, ExecutionContext, Cast } from '../../../../index';

@Prop.Class()
export class NotaIngresoCredito extends SalidaEfectivo implements ICredito<NotaIngresoCuota> {

    static override type = ModelType.NotaIngresoCredito;
    override type = ModelType.NotaIngresoCredito;

    readonly #credito: Credito<NotaIngresoCuota> = new Credito<NotaIngresoCuota>( {}, this );

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaIngreso( x ) } ) override documentoFuente?: NotaIngreso | null;

    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;

    #cuotas?: NotaIngresoCuota[] | null | undefined;

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }

    @Prop.Set()
    public get tasaInteresDiario(): number | null | undefined { return this.#tasaInteresDiario; }
    public set tasaInteresDiario( value: number | null | undefined ) { this.#tasaInteresDiario = value; }

    @Prop.Set()
    public get importeInteres(): number | null | undefined { return this.#importeInteres; }
    public set importeInteres( value: number | null | undefined ) { this.#importeInteres = value; }

    @Prop.Set()
    public get porcentajeInteres(): number | null | undefined { return this.#porcentajeInteres; }
    public set porcentajeInteres( value: number | null | undefined ) { this.#porcentajeInteres = value; }

    @Prop.Set()
    public get importeValorFinal(): number | null | undefined { return this.#importeValorFinal; }
    public set importeValorFinal( value: number | null | undefined ) { this.#importeValorFinal = value; }

    get decimalTasaInteresDiario(): Decimal { return Cast.toDecimal( this.tasaInteresDiario ) }
    get decimalImporteInteres(): Decimal { return Cast.toDecimal( this.importeInteres ) }
    get decimalPorcentajeInteres(): Decimal { return Cast.toDecimal( this.porcentajeInteres ) }
    get decimalImporteValorFinal(): Decimal { return Cast.toDecimal( this.importeValorFinal ) }

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaIngresoCuota( x ) } )
    get cuotas(): NotaIngresoCuota[] | null | undefined { return this.#cuotas; }
    set cuotas( value: NotaIngresoCuota[] | null | undefined ) { this.#cuotas = value; };

    get decimalDuracionMinutos() { return this.#credito.decimalDuracionMinutos; }
    get interesXminuto() { return this.#credito.interesXminuto; }
    get amortizacionXminuto() { return this.#credito.amortizacionXminuto; }
    get cuotaXminuto() { return this.#credito.cuotaXminuto; }


    constructor( item?: OptionalModel<NotaIngresoCredito> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaIngresoCredito> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaIngresoCredito> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaIngresoCredito.type, () => {

            this.documentoFuente?.assign( {
                credito: this
            } ).setRelation( context );

            this.#credito.setRelation( context );

        } )

        return this;
    }


    agregarCuota( cuota: NotaIngresoCuota ): this {
        this.#credito.agregarCuota( cuota );
        return this;
    }


    actualizarCuota( cuota: NotaIngresoCuota ): this {
        this.#credito.actualizarCuota( cuota );
        return this;
    }


    eliminarCuota( cuota: NotaIngresoCuota ): this {
        this.#credito.eliminarCuota( cuota );
        return this;
    }


    getCuota( cuota: NotaIngresoCuota ): NotaIngresoCuota | undefined {
        return this.#credito.getCuota( cuota );
    }


    override procesarInformacion(): this {
        return this.procesarCredito();
    }


    procesarCredito(): this {
        this.#credito.procesarCredito();
        return this;
    }


    procesarPagos( importeCobrado: number ): this {
        this.#credito.procesarPagos( importeCobrado );
        return this;
    }
}