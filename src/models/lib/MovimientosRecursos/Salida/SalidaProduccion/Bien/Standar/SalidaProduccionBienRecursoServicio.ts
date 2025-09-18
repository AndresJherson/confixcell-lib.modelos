import Decimal from 'decimal.js';
import { Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionBienActividad, Servicio } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoServicio extends Model {

    static override type = 'SalidaProduccionBienRecursoServicio';
    override type = 'SalidaProduccionBienRecursoServicio';
    private __SalidaProduccionBienRecursoServicio!: 'SalidaProduccionBienRecursoServicio';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionBienActividad( x ) } ) actividad?: SalidaProduccionBienActividad | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Servicio.initialize( [x] )[0] } ) servicio?: Servicio | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }

    constructor( item?: OptionalModel<SalidaProduccionBienRecursoServicio> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBienRecursoServicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBienRecursoServicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaProduccionBienRecursoServicio.type, () => {

            this.actividad?.setRelation( context );

            this.servicio?.setRelation( context );

        } );

        return this;
    }
}