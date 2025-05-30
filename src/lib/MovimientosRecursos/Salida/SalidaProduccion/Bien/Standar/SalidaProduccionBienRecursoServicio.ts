import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionBienActividad, Servicio } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoServicio extends Model
{
    static override type: string = 'SalidaProduccionBienRecursoServicio';
    override type: string = SalidaProduccionBienRecursoServicio.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionBienActividad( x ) ) actividad?: SalidaProduccionBienActividad;
    @Prop.Set( PropBehavior.model, x => new Servicio( x ) ) servicio?: Servicio;
    
    @Prop.Set() importeValor: number = 0;
    get decimalImporteValor(): Decimal {
        return Prop.toDecimal( this.importeValor );
    }

    constructor( item?: Partial<SalidaProduccionBienRecursoServicio> )
    {
        super();
        Prop.initialize( this, item );
    }
}