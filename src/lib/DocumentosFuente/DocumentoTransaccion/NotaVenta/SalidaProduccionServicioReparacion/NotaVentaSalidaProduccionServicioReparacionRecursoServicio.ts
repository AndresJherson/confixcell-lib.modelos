import { DateTime } from 'luxon';
import { Model, NotaVentaCategoriaReparacion, NotaVentaSalidaProduccionServicioReparacion, Prop, PropBehavior } from '../../../../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacionRecursoServicio extends Model
{
    static override type: string = 'NotaVentaSalidaProduccionServicioReparacionRecursoServicio';
    override type: string = NotaVentaSalidaProduccionServicioReparacionRecursoServicio.type;

    @Prop.Set( PropBehavior.model, x => new NotaVentaSalidaProduccionServicioReparacion( x ) ) salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion;
    @Prop.Set( PropBehavior.model, x => new NotaVentaCategoriaReparacion( x ) ) categoriaReparacion?: NotaVentaCategoriaReparacion;
    @Prop.Set() descripcion?: string;
    
    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaFinal?: string;
    
    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
    }
    
    @Prop.Set() importeCostoNeto: number = 0;
    @Prop.Set() importePrecioNeto: number = 0;

    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }
    get decimalImportePrecioNeto(): Decimal {
        return Prop.toDecimal( this.importePrecioNeto );
    }



    constructor( item?: Partial<NotaVentaSalidaProduccionServicioReparacionRecursoServicio> )
    {
        super();
        Prop.initialize( this, item );
    }
}