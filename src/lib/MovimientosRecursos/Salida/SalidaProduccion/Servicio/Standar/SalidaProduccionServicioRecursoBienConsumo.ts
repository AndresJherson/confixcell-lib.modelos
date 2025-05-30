import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Model, Prop, PropBehavior, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoBienConsumo extends Model
{
    static override type: string = 'SalidaProduccionServicioRecursoBienConsumo';
    override type: string = SalidaProduccionServicioRecursoBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioActividad( x ) ) actividad?: SalidaProduccionServicioActividad;
    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    
    @Prop.Set() cantidad: number = 0;
    @Prop.Set() importeValorUnitario: number = 0;
    @Prop.Set() importeValorNeto: number = 0;

    get decimalCantidad(): Decimal {
        return Prop.toDecimal( this.cantidad );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }


    constructor( item?: Partial<SalidaProduccionServicioRecursoBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
        try {
            
            this.importeValorNeto = this.decimalImporteValorUnitario
                                    .mul( this.cantidad )
                                    .toNumber();

        }
        catch ( error ) {
            this.importeValorNeto = 0;
        }
                                
        return this;
    }
}