import { DateTime } from 'luxon';
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class EventoPendienteKardexBienConsumo extends Model {

    static override type: string = ModelType.EventoPendienteKardexBienConsumo;
    override type: string = ModelType.EventoPendienteKardexBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new KardexBienConsumo( x ) } ) kardex?: KardexBienConsumo | null;
    @Prop.Set() evento?: string | null;
    @Prop.Set( { behavior: PropBehavior.object } ) data?: Record<any, any> | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
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