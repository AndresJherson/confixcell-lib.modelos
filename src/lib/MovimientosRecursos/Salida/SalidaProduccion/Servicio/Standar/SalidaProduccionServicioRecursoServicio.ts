import Decimal from 'decimal.js';
import { Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionServicioActividad, Servicio } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoServicio extends Model {

    static override type: string = ModelType.SalidaProduccionServicioRecursoServicio;
    override type: string = ModelType.SalidaProduccionServicioRecursoServicio;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionServicioActividad( x ) } ) actividad?: SalidaProduccionServicioActividad | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Servicio.initialize( [x] )[0] } ) servicio?: Servicio | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }


    constructor( item?: OptionalModel<SalidaProduccionServicioRecursoServicio> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionServicioRecursoServicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionServicioRecursoServicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaProduccionServicioRecursoServicio.type, () => {

            this.actividad?.setRelation( context );

            this.servicio?.setRelation( context );
            
        } );

        return this;
    }
}