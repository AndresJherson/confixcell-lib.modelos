import Decimal from 'decimal.js';
import { Credito, EntradaEfectivo, EntradaEfectivoCuota, ExecutionContext, ICredito, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoCredito extends EntradaEfectivo implements ICredito<EntradaEfectivoCuota> {

    static override type: string = ModelType.EntradaEfectivoCredito;
    override type = ModelType.EntradaEfectivoCredito;

    protected readonly credito: Credito<EntradaEfectivoCuota> = new Credito<EntradaEfectivoCuota>();

    @Prop.Set() tasaInteresDiario?: number | undefined;
    @Prop.Set() importeInteres?: number | undefined;
    @Prop.Set() porcentajeInteres?: number | undefined;
    @Prop.Set() importeValorFinal?: number | undefined;

    override get decimalImporteValorNeto(): Decimal { return this.credito.decimalImporteValorNeto }
    get decimalTasaInteresDiario(): Decimal { return this.credito.decimalTasaInteresDiario }
    get decimalImporteInteres(): Decimal { return this.credito.decimalImporteInteres }
    get decimalPorcentajeInteres(): Decimal { return this.credito.decimalPorcentajeInteres }
    get decimalImporteValorFinal(): Decimal { return this.credito.decimalImporteValorFinal }

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new EntradaEfectivoCuota( x ) } ) declare cuotas?: EntradaEfectivoCuota[];

    get decimalDuracionMinutos() { return this.credito.decimalDuracionMinutos; }
    get interesXminuto() { return this.credito.interesXminuto; }
    get amortizacionXminuto() { return this.credito.amortizacionXminuto; }
    get cuotaXminuto() { return this.credito.cuotaXminuto; }


    constructor( item?: OptionalModel<EntradaEfectivoCredito> ) {
        super()
        Prop.initialize( this, item );
        Prop.extends( this, 'credito', this.credito );
    }


    override set( item: OptionalModel<EntradaEfectivoCredito> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaEfectivoCredito> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        this.credito.setRelation( context );

        return this;
    }


    agregarCuota( cuota: EntradaEfectivoCuota ): this {
        this.credito.agregarCuota( cuota );
        return this;
    }


    actualizarCuota( cuota: EntradaEfectivoCuota ): this {
        this.credito.actualizarCuota( cuota );
        return this;
    }


    eliminarCuota( cuota: EntradaEfectivoCuota ): this {
        this.credito.eliminarCuota( cuota );
        return this;
    }


    getCuota( cuota: EntradaEfectivoCuota ): EntradaEfectivoCuota | undefined {
        return this.credito.getCuota( cuota );
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

