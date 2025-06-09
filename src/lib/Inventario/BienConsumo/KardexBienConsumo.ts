import { DateTime } from 'luxon';
import { Almacen, BienConsumo, ErrorKardexBienConsumo, EventoPendienteKardexBienConsumo, InventarioBienConsumo, KardexMovimientoBienConsumo, Model, Prop, PropBehavior } from '../../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class KardexBienConsumo extends Model
{
    static override type = 'KardexBienConsumo';
    override type: string = KardexBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new InventarioBienConsumo( x ) ) inventario?: InventarioBienConsumo;
    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;

    @Prop.Set( PropBehavior.array, x => new EventoPendienteKardexBienConsumo( x ) ) eventosPendientes?: EventoPendienteKardexBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new ErrorKardexBienConsumo( x ) ) errores?: ErrorKardexBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new KardexMovimientoBienConsumo( x ) ) movimientos?: KardexMovimientoBienConsumo[];
    
    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;
    
    get dateTimeFechaCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeFechaActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }

    @Prop.Set() entradaCantidadAcumulado: number = 0;
    @Prop.Set() entradaCostoAcumulado: number = 0;
    @Prop.Set() salidaCantidadAcumulado: number = 0;
    @Prop.Set() salidaCostoAcumulado: number = 0;
    @Prop.Set() saldoCantidad: number = 0;
    @Prop.Set() saldoValorUnitario: number = 0;
    @Prop.Set() saldoValorTotal: number = 0;

    get decimalEntradaCantidadAcumulado(): Decimal {
        return Prop.toDecimal( this.entradaCantidadAcumulado );
    }
    get decimalEntradaCostoAcumulado(): Decimal {
        return Prop.toDecimal( this.entradaCostoAcumulado );
    }
    get decimalSalidaCantidadAcumulado(): Decimal {
        return Prop.toDecimal( this.salidaCantidadAcumulado );
    }
    get decimalSalidaCostoAcumulado(): Decimal {
        return Prop.toDecimal( this.salidaCostoAcumulado );
    }
    get decimalSaldoCantidad(): Decimal {
        return Prop.toDecimal( this.saldoCantidad );
    }
    get decimalSaldoValorUnitario(): Decimal {
        return Prop.toDecimal( this.saldoValorUnitario );
    }
    get decimalSaldoValorTotal(): Decimal {
        return Prop.toDecimal( this.saldoValorTotal );
    }


    constructor( item?: Partial<KardexBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}