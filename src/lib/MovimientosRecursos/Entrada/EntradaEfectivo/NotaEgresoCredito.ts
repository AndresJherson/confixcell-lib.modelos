import Decimal from 'decimal.js';
import { Credito, EntradaEfectivo, NotaEgresoCuota, Prop, PropBehavior, ModelType, NotaEgreso, ICredito, OptionalModel, ExecutionContext } from '../../../../index';

@Prop.Class()
export class NotaEgresoCredito extends EntradaEfectivo implements ICredito<NotaEgresoCuota> {

    static override type = ModelType.NotaEgresoCredito;
    override type = ModelType.NotaEgresoCredito;

    protected readonly credito: Credito<NotaEgresoCuota> = new Credito<NotaEgresoCuota>();

    @Prop.Set() tasaInteresDiario?: number | undefined | null;
    @Prop.Set() importeInteres?: number | undefined | null;
    @Prop.Set() porcentajeInteres?: number | undefined | null;
    @Prop.Set() importeValorFinal?: number | undefined | null;

    override get decimalImporteValorNeto(): Decimal { return this.credito.decimalImporteValorNeto }
    get decimalTasaInteresDiario(): Decimal { return this.credito.decimalTasaInteresDiario }
    get decimalImporteInteres(): Decimal { return this.credito.decimalImporteInteres }
    get decimalPorcentajeInteres(): Decimal { return this.credito.decimalPorcentajeInteres }
    get decimalImporteValorFinal(): Decimal { return this.credito.decimalImporteValorFinal }

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaEgreso( x ) } ) declare documentoFuente?: NotaEgreso | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaEgresoCuota( x ) } ) declare cuotas?: NotaEgresoCuota[] | null;

    get decimalDuracionMinutos() { return this.credito.decimalDuracionMinutos; }
    get interesXminuto() { return this.credito.interesXminuto; }
    get amortizacionXminuto() { return this.credito.amortizacionXminuto; }
    get cuotaXminuto() { return this.credito.cuotaXminuto; }


    constructor( item?: OptionalModel<NotaEgresoCredito> ) {
        super();
        Prop.initialize( this, item );
        Prop.extends( this, 'credito', this.credito );
    }


    override set( item: OptionalModel<NotaEgresoCredito> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaEgresoCredito> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        this.credito.setRelation( context );

        return this;
    }


    agregarCuota( cuota: NotaEgresoCuota ): this {
        this.credito.agregarCuota( cuota );
        return this;
    }


    actualizarCuota( cuota: NotaEgresoCuota ): this {
        this.credito.actualizarCuota( cuota );
        return this;
    }


    eliminarCuota( cuota: NotaEgresoCuota ): this {
        this.credito.eliminarCuota( cuota );
        return this;
    }


    getCuota( cuota: NotaEgresoCuota ): NotaEgresoCuota | undefined {
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