import { DateTime } from 'luxon';
import { Cast, ExecutionContext, Model, ModelType, NotaVentaSalidaProduccionServicioReparacion, OptionalModel, Prop, PropBehavior, ServicioReparacion } from '../../../../../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacionRecursoServicio extends Model {

    static override type: string = ModelType.NotaVentaSalidaProduccionServicioReparacionRecursoServicio;
    override type: string = ModelType.NotaVentaSalidaProduccionServicioReparacionRecursoServicio;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVentaSalidaProduccionServicioReparacion( x ) } ) salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new ServicioReparacion( x ) } ) servicioReparacion?: ServicioReparacion | null;
    @Prop.Set() descripcion?: string | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaInicio?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaFinal?: string | null;

    get dateTimeInicio(): DateTime { return Cast.toDateTime( this.fechaInicio ); }
    get dateTimeFinal(): DateTime { return Cast.toDateTime( this.fechaFinal ); }

    @Prop.Set() importeCostoNeto?: number | null;
    @Prop.Set() importeValorNeto?: number | null;

    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }
    get decimalImporteValorNeto(): Decimal { return Cast.toDecimal( this.importeValorNeto ); }



    constructor( item?: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoServicio> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoServicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoServicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
     
        super.setRelation( context );

        context.execute( this, NotaVentaSalidaProduccionServicioReparacionRecursoServicio.type, () => {

            this.salidaProduccion?.setRelation( context );

            this.servicioReparacion?.setRelation( context );

        } );

        return this;
    }
}