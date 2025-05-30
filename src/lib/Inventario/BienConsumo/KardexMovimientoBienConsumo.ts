import { DateTime } from "luxon";
import { KardexBienConsumo, Model, MovimientoTipoBienConsumo, Prop, PropBehavior } from "../../../index";
import Decimal from "decimal.js";

@Prop.Class()
export class KardexMovimientoBienConsumo extends Model
{
    static override type = 'KardexMovimientoBienConsumo';
    override type: string = KardexMovimientoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new KardexBienConsumo( x ) ) kardex?: KardexBienConsumo;
    @Prop.Set() movimientoUuid?: string;
    @Prop.Set() movimientoRefUuid?: string;
    @Prop.Set( PropBehavior.string ) movimientoTipo?: MovimientoTipoBienConsumo;

    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    @Prop.Set() documentoFuenteCodigoSerie?: string;
    @Prop.Set() documentoFuenteCodigoNumero?: number;
    @Prop.Set() concepto?: string;

    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }
    
    @Prop.Set() entradaCantidad?: number;
    @Prop.Set() entradaCostoUnitario?: number;
    @Prop.Set() entradaCostoTotal?: number;
    get decimalEntradaCantidad(): Decimal {
        return Prop.toDecimal( this.entradaCantidad );
    }
    get decimalEntradaCostoUnitario(): Decimal {
        return Prop.toDecimal( this.entradaCostoUnitario );
    }
    get decimalEntradaCostoTotal(): Decimal {
        return Prop.toDecimal( this.entradaCostoTotal );
    }

    @Prop.Set() salidaCantidad?: number;
    @Prop.Set() salidaCostoUnitario?: number;
    @Prop.Set() salidaCostoTotal?: number;
    get decimalSalidaCantidad(): Decimal {
        return Prop.toDecimal( this.entradaCantidad );
    }
    get decimalSalidaCostoUnitario(): Decimal {
        return Prop.toDecimal( this.salidaCostoUnitario );
    }
    get decimalSalidaCostoTotal(): Decimal {
        return Prop.toDecimal( this.salidaCostoTotal );
    }

    @Prop.Set() saldoCantidad: number = 0;
    @Prop.Set() saldoValorUnitario: number = 0;
    @Prop.Set() saldoValorTotal: number = 0;
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