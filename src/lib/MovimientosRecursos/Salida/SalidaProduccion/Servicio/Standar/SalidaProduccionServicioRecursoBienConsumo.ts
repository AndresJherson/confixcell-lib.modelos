import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Model, Prop, PropBehavior, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoBienConsumo extends Model {
    static override type: string = 'SalidaProduccionServicioRecursoBienConsumo';
    override type: string = SalidaProduccionServicioRecursoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioActividad( x ) ) actividad?: SalidaProduccionServicioActividad;
    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;

    @Prop.Set() cantidad?: number;
    @Prop.Set() importeCostoUnitario?: number;
    @Prop.Set() importeCostoNeto?: number;

    get decimalCantidad(): Decimal {
        return Prop.toDecimal( this.cantidad );
    }
    get decimalImporteCostoUnitario(): Decimal {
        return Prop.toDecimal( this.importeCostoUnitario );
    }
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionServicioRecursoBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this {
        try {

            this.importeCostoNeto = this.decimalImporteCostoUnitario
                .mul( this.decimalCantidad )
                .toNumber();

        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        return this;
    }
}