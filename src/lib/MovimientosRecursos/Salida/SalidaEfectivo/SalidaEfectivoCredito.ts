import Decimal from 'decimal.js';
import { Credito, ExecutionContext, ICredito, ModelType, OptionalModel, Prop, PropBehavior, SalidaEfectivo, SalidaEfectivoCuota } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoCredito extends SalidaEfectivo implements ICredito<SalidaEfectivoCuota> {

    static override type = ModelType.SalidaEfectivoCredito;
    override type = ModelType.SalidaEfectivoCredito;

    protected readonly credito: Credito<SalidaEfectivoCuota> = new Credito<SalidaEfectivoCuota>();

    @Prop.Set() tasaInteresDiario?: number | undefined | null;
    @Prop.Set() importeInteres?: number | undefined | null;
    @Prop.Set() porcentajeInteres?: number | undefined | null;
    @Prop.Set() importeValorFinal?: number | undefined | null;

    override get decimalImporteValorNeto(): Decimal { return this.credito.decimalImporteValorNeto }
    get decimalTasaInteresDiario(): Decimal { return this.credito.decimalTasaInteresDiario }
    get decimalImporteInteres(): Decimal { return this.credito.decimalImporteInteres }
    get decimalPorcentajeInteres(): Decimal { return this.credito.decimalPorcentajeInteres }
    get decimalImporteValorFinal(): Decimal { return this.credito.decimalImporteValorFinal }

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaEfectivoCuota( x ) } ) declare cuotas?: SalidaEfectivoCuota[] | null;

    get decimalDuracionMinutos() { return this.credito.decimalDuracionMinutos; }
    get interesXminuto() { return this.credito.interesXminuto; }
    get amortizacionXminuto() { return this.credito.amortizacionXminuto; }
    get cuotaXminuto() { return this.credito.cuotaXminuto; }



    constructor( item?: OptionalModel<SalidaEfectivoCredito> ) {
        super()
        Prop.initialize( this, item );
        Prop.extends( this, 'credito', this.credito );
    }


    override set( item: OptionalModel<SalidaEfectivoCredito> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaEfectivoCredito> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        this.credito.setRelation( context );

        return this;
    }


    agregarCuota( cuota: SalidaEfectivoCuota ): this {
        this.credito.agregarCuota( cuota );
        return this;
    }


    actualizarCuota( cuota: SalidaEfectivoCuota ): this {
        this.credito.actualizarCuota( cuota );
        return this;
    }


    eliminarCuota( cuota: SalidaEfectivoCuota ): this {
        this.credito.eliminarCuota( cuota );
        return this;
    }


    getCuota( cuota: SalidaEfectivoCuota ): SalidaEfectivoCuota | undefined {
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