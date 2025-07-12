import { DateTime } from "luxon";
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from "../../../index";
import Decimal from "decimal.js";

@Prop.Class()
export class KardexMovimientoBienConsumo extends Model {

    static override type = ModelType.KardexMovimientoBienConsumo;
    override type = ModelType.KardexMovimientoBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new KardexBienConsumo( x ) } ) kardex?: KardexBienConsumo;
    @Prop.Set() referenciaUuid?: string;
    @Prop.Set() movimientoTipo?: string;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }

    @Prop.Set() documentoFuenteCodigoSerie?: string;
    @Prop.Set() documentoFuenteCodigoNumero?: number;
    @Prop.Set() concepto?: string;


    @Prop.Set() entradaCantidad?: number;
    @Prop.Set() entradaCostoUnitario?: number;
    @Prop.Set() entradaCostoTotal?: number;
    @Prop.Set() entradaCantidadAcumulado?: number;
    @Prop.Set() entradaCostoAcumulado?: number;

    get decimalEntradaCantidad(): Decimal { return Cast.toDecimal( this.entradaCantidad ); }
    get decimalEntradaCostoUnitario(): Decimal { return Cast.toDecimal( this.entradaCostoUnitario ); }
    get decimalEntradaCostoTotal(): Decimal { return Cast.toDecimal( this.entradaCostoTotal ); }
    get decimalEntradaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.entradaCantidadAcumulado ); }
    get decimalEntradaCostoAcumulado(): Decimal { return Cast.toDecimal( this.entradaCostoAcumulado ); }

    @Prop.Set() salidaCantidad?: number;
    @Prop.Set() salidaCostoUnitario?: number;
    @Prop.Set() salidaCostoTotal?: number;
    @Prop.Set() salidaCantidadAcumulado?: number;
    @Prop.Set() salidaCostoAcumulado?: number;

    get decimalSalidaCantidad(): Decimal { return Cast.toDecimal( this.entradaCantidad ); }
    get decimalSalidaCostoUnitario(): Decimal { return Cast.toDecimal( this.salidaCostoUnitario ); }
    get decimalSalidaCostoTotal(): Decimal { return Cast.toDecimal( this.salidaCostoTotal ); }
    get decimalSalidaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.entradaCantidadAcumulado ); }
    get decimalSalidaCostoAcumulado(): Decimal { return Cast.toDecimal( this.salidaCostoAcumulado ); }

    @Prop.Set() saldoCantidad?: number;
    @Prop.Set() saldoValorUnitario?: number;
    @Prop.Set() saldoValorTotal?: number;

    get decimalSaldoCantidad(): Decimal { return Cast.toDecimal( this.saldoCantidad ); }
    get decimalSaldoValorUnitario(): Decimal { return Cast.toDecimal( this.saldoValorUnitario ); }
    get decimalSaldoValorTotal(): Decimal { return Cast.toDecimal( this.saldoValorTotal ); }


    constructor( item?: OptionalModel<KardexMovimientoBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<KardexMovimientoBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<KardexMovimientoBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, KardexMovimientoBienConsumo.type, () => {

            this.kardex?.setRelation( context )

        } );

        return this;
    }
}