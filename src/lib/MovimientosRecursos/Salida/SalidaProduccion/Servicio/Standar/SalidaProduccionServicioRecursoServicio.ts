import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionServicioActividad, Servicio } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoServicio extends Model
{
    static override type: string = 'SalidaProduccionServicioRecursoServicio';
    override type: string = SalidaProduccionServicioRecursoServicio.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioActividad( x ) ) actividad?: SalidaProduccionServicioActividad;
    @Prop.Set( PropBehavior.model, x => new Servicio( x ) ) servicio?: Servicio;
    
    @Prop.Set() importeValor: number = 0;
    get decimalImporteValor(): Decimal {
        return Prop.toDecimal( this.importeValor );
    }


    constructor( item?: Partial<SalidaProduccionServicioRecursoServicio> )
    {
        super();
        Prop.initialize( this, item );
    }
}