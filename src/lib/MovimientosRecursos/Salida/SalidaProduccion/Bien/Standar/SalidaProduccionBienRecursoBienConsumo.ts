import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Model, Prop, PropBehavior, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoBienConsumo extends Model
{
    static override type: string = 'SalidaProduccionBienRecursoBienConsumo';
    override type: string = SalidaProduccionBienRecursoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionBienActividad( x ) ) actividad?: SalidaProduccionBienActividad;
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


    constructor( item?: Partial<SalidaProduccionBienRecursoBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
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