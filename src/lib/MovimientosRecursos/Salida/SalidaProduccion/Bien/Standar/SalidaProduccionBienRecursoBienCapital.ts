import Decimal from 'decimal.js';
import { BienCapital, Model, Prop, PropBehavior, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoBienCapital extends Model
{
    static override type: string = 'SalidaProduccionBienRecursoBienCapital';
    override type: string = SalidaProduccionBienRecursoBienCapital.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionBienActividad( x ) ) actividad?: SalidaProduccionBienActividad;
    @Prop.Set( PropBehavior.model, x => new BienCapital( x ) ) bienCapital?: BienCapital;

    @Prop.Set() importeCostoNeto?: number;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionBienRecursoBienCapital> )
    {
        super();
        Prop.initialize( this, item );
    }
}