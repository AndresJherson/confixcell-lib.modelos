import { DateTime } from 'luxon';
import { Almacen, BienConsumo, InventarioBienConsumo, KardexMovimientoBienConsumo, Model, Prop, PropBehavior } from '../../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class KardexBienConsumo extends Model
{
    static override type = 'KardexBienConsumo';
    override type: string = KardexBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new InventarioBienConsumo( x ) ) inventario: InventarioBienConsumo = new InventarioBienConsumo();
    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    @Prop.Set() eventosPendientes: number = 0;
    @Prop.Set( PropBehavior.array, x => new KardexMovimientoBienConsumo( x ) ) movimientos: KardexMovimientoBienConsumo[] = [];
    
    @Prop.Set( PropBehavior.date ) fechaInicial?: string;
    @Prop.Set( PropBehavior.date ) fechaFinal?: string;
    get dateTimeFechaInicial(): DateTime {
        return Prop.toDateTime( this.fechaInicial );
    }
    get dateTimeFechaFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
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


    constructor( item?: Partial<KardexBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}