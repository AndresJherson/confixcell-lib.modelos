import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Model, NotaVentaSalidaProduccionServicioReparacion, Prop, PropBehavior } from '../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo extends Model
{
    static override type: string = 'NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo';
    override type: string = NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new NotaVentaSalidaProduccionServicioReparacion( x ) ) salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion;

    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }

    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    @Prop.Set() cantidad?: number;
    @Prop.Set() importeCostoUnitario?: number;
    @Prop.Set() importeCostoNeto?: number;
    @Prop.Set() importePrecioUnitario?: number;
    @Prop.Set() importePrecioNeto?: number;

    get decimalCantidad(): Decimal {
        return Prop.toDecimal( this.cantidad );
    }
    get decimalImporteCostoUnitario(): Decimal {
        return Prop.toDecimal( this.importeCostoUnitario );
    }
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }
    get decimalImportePrecioUnitario(): Decimal {
        return Prop.toDecimal( this.importePrecioUnitario );
    }
    get decimalImportePrecioNeto(): Decimal {
        return Prop.toDecimal( this.importePrecioNeto );
    }


    constructor( item?: Partial<NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
        try {
            this.importeCostoNeto = this.decimalImporteCostoUnitario
                .mul( this.cantidad ?? 0 )
                .toNumber();

            this.importePrecioNeto = this.decimalImportePrecioUnitario
                .mul( this.cantidad ?? 0 )
                .toNumber();
        }
        catch ( error ) {
            this.importeCostoNeto = 0;
            this.importePrecioNeto = 0;
        }

        return this;
    }
}