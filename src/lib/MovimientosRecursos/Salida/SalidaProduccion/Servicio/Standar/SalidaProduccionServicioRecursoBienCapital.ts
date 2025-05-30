import Decimal from 'decimal.js';
import { BienCapital, Model, Prop, PropBehavior, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoBienCapital extends Model
{
    static override type: string = 'SalidaProduccionServicioRecursoBienCapital';
    override type: string = SalidaProduccionServicioRecursoBienCapital.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioActividad( x ) ) actividad?: SalidaProduccionServicioActividad;
    @Prop.Set( PropBehavior.model, x => new BienCapital( x ) ) bienCapital?: BienCapital;
    
    @Prop.Set() importeValor: number = 0;
    get decimalImporteValor(): Decimal {
        return Prop.toDecimal( this.importeValor );
    }


    constructor( item?: Partial<SalidaProduccionServicioRecursoBienCapital> )
    {
        super();
        Prop.initialize( this, item );
    }
}