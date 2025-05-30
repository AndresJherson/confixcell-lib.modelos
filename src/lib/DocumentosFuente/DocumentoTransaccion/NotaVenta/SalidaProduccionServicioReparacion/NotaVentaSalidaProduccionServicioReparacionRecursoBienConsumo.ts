import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Model, NotaVentaSalidaProduccionServicioReparacion, Prop, PropBehavior, Servicio } from '../../../../../index';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo extends Model
{
    static override type: string = 'NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo';
    override type: string = NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new NotaVentaSalidaProduccionServicioReparacion( x ) ) salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion;
    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    @Prop.Set() cantidad: number = 0;
    @Prop.Set() importeValorUnitario: number = 0;
    @Prop.Set() importeValorNeto: number = 0;
    @Prop.Set() importePrecioUnitario: number = 0;
    @Prop.Set() importePrecioNeto: number = 0;

    get decimalCantidad(): Decimal {
        return Prop.toDecimal( this.cantidad );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
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
            this.importeValorNeto = new Decimal( this.importeValorUnitario )
                .mul( this.cantidad )
                .toNumber();

            this.importePrecioNeto = new Decimal( this.importePrecioUnitario )
                .mul( this.cantidad )
                .toNumber();
        }
        catch ( error ) {
            this.importeValorNeto = 0;
            this.importePrecioNeto = 0;
        }

        return this;
    }
}