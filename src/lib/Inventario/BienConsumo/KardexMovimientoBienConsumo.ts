import { DateTime } from "luxon";
import { KardexBienConsumo, Model, Prop, PropBehavior } from "../../../index";
import Decimal from "decimal.js";

@Prop.Class()
export class KardexMovimientoBienConsumo extends Model
{
    static override type = 'KardexMovimientoBienConsumo';
    override type: string = KardexMovimientoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new KardexBienConsumo( x ) ) kardex?: KardexBienConsumo;
    @Prop.Set() referenciaUuid?: string;
    @Prop.Set() movimientoTipo?: string;

    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }

    @Prop.Set() documentoFuenteCodigoSerie?: string;
    @Prop.Set() documentoFuenteCodigoNumero?: number;
    @Prop.Set() concepto?: string;

    
    @Prop.Set() entradaCantidad?: number;
    @Prop.Set() entradaCostoUnitario?: number;
    @Prop.Set() entradaCostoTotal?: number;
    @Prop.Set() entradaCantidadAcumulado?: number;
    @Prop.Set() entradaCostoAcumulado?: number;

    get decimalEntradaCantidad(): Decimal {
        return Prop.toDecimal( this.entradaCantidad );
    }
    get decimalEntradaCostoUnitario(): Decimal {
        return Prop.toDecimal( this.entradaCostoUnitario );
    }
    get decimalEntradaCostoTotal(): Decimal {
        return Prop.toDecimal( this.entradaCostoTotal );
    }
    get decimalEntradaCantidadAcumulado(): Decimal {
        return Prop.toDecimal( this.entradaCantidadAcumulado );
    }
    get decimalEntradaCostoAcumulado(): Decimal {
        return Prop.toDecimal( this.entradaCostoAcumulado );
    }

    @Prop.Set() salidaCantidad?: number;
    @Prop.Set() salidaCostoUnitario?: number;
    @Prop.Set() salidaCostoTotal?: number;
    @Prop.Set() salidaCantidadAcumulado?: number;
    @Prop.Set() salidaCostoAcumulado?: number;

    get decimalSalidaCantidad(): Decimal {
        return Prop.toDecimal( this.entradaCantidad );
    }
    get decimalSalidaCostoUnitario(): Decimal {
        return Prop.toDecimal( this.salidaCostoUnitario );
    }
    get decimalSalidaCostoTotal(): Decimal {
        return Prop.toDecimal( this.salidaCostoTotal );
    }
    get decimalSalidaCantidadAcumulado(): Decimal {
        return Prop.toDecimal( this.entradaCantidadAcumulado );
    }
    get decimalSalidaCostoAcumulado(): Decimal {
        return Prop.toDecimal( this.salidaCostoAcumulado );
    }

    @Prop.Set() saldoCantidad?: number;
    @Prop.Set() saldoValorUnitario?: number;
    @Prop.Set() saldoValorTotal?: number;

    get decimalSaldoCantidad(): Decimal {
        return Prop.toDecimal( this.saldoCantidad );
    }
    get decimalSaldoValorUnitario(): Decimal {
        return Prop.toDecimal( this.saldoValorUnitario );
    }
    get decimalSaldoValorTotal(): Decimal {
        return Prop.toDecimal( this.saldoValorTotal );
    }


    constructor( item?: Partial<KardexMovimientoBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}