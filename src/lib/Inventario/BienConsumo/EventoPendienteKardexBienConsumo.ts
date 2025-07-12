import { DateTime } from 'luxon';
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class EventoPendienteKardexBienConsumo extends Model {

    static override type = ModelType.EventoPendienteKardexBienConsumo;
    override type = ModelType.EventoPendienteKardexBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new KardexBienConsumo( x ) } ) kardex?: KardexBienConsumo;
    @Prop.Set() evento?: string;
    @Prop.Set( { behavior: PropBehavior.object } ) data?: Record<any, any>;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }


    constructor( item?: OptionalModel<EventoPendienteKardexBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EventoPendienteKardexBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EventoPendienteKardexBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, EventoPendienteKardexBienConsumo.type, () => {

            this.kardex?.setRelation( context );

        } );

        return this;
    }
}