import Decimal from 'decimal.js';
import { Credito, NotaIngresoCuota, Prop, PropBehavior, SalidaEfectivo, ModelType, NotaIngreso, ICredito, OptionalModel, SalidaRecurso, ExecutionContext } from '../../../../index';

@Prop.Class()
export class NotaIngresoCredito extends SalidaEfectivo implements ICredito<NotaIngresoCuota> {

    static override type = ModelType.NotaIngresoCredito;
    override type = ModelType.NotaIngresoCredito;

    protected readonly credito: Credito<NotaIngresoCuota> = new Credito<NotaIngresoCuota>();

    @Prop.Set() tasaInteresDiario?: number | undefined;
    @Prop.Set() importeInteres?: number | undefined;
    @Prop.Set() porcentajeInteres?: number | undefined;
    @Prop.Set() importeValorFinal?: number | undefined;

    override get decimalImporteValorNeto(): Decimal { return this.credito.decimalImporteValorNeto }
    get decimalTasaInteresDiario(): Decimal { return this.credito.decimalTasaInteresDiario }
    get decimalImporteInteres(): Decimal { return this.credito.decimalImporteInteres }
    get decimalPorcentajeInteres(): Decimal { return this.credito.decimalPorcentajeInteres }
    get decimalImporteValorFinal(): Decimal { return this.credito.decimalImporteValorFinal }

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaIngreso( x ) } ) override documentoFuente?: NotaIngreso;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaIngresoCuota( x ) } ) declare cuotas?: NotaIngresoCuota[];

    get decimalDuracionMinutos() { return this.credito.decimalDuracionMinutos; }
    get interesXminuto() { return this.credito.interesXminuto; }
    get amortizacionXminuto() { return this.credito.amortizacionXminuto; }
    get cuotaXminuto() { return this.credito.cuotaXminuto; }


    constructor( item?: OptionalModel<NotaIngresoCredito> ) {
        super();
        Prop.initialize( this, item );
        Prop.extends( this, 'credito', this.credito );
    }


    override set( item: OptionalModel<NotaIngresoCredito> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaIngresoCredito> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        this.credito.setRelation( context );

        return this;
    }


    agregarCuota( cuota: NotaIngresoCuota ): this {
        this.credito.agregarCuota( cuota );
        return this;
    }


    actualizarCuota( cuota: NotaIngresoCuota ): this {
        this.credito.actualizarCuota( cuota );
        return this;
    }


    eliminarCuota( cuota: NotaIngresoCuota ): this {
        this.credito.eliminarCuota( cuota );
        return this;
    }


    getCuota( cuota: NotaIngresoCuota ): NotaIngresoCuota | undefined {
        return this.credito.getCuota( cuota );
    }


    override procesarInformacion(): this {
        return this.procesarCredito();
    }


    procesarCredito(): this {
        this.credito.procesarCredito();
        return this;
    }


    procesarPagos( importeCobrado: number ): this {
        this.procesarPagos( importeCobrado );
        return this;
    }
}