import { DateTime } from 'luxon';
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class ErrorKardexBienConsumo extends Model {

    static override type: string = ModelType.ErrorKardexBienConsumo;
    override type: string = ModelType.ErrorKardexBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new KardexBienConsumo( x ) } ) kardex?: KardexBienConsumo | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set() mensaje?: string | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }


    constructor( item?: OptionalModel<ErrorKardexBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<ErrorKardexBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ErrorKardexBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, ErrorKardexBienConsumo.type, () => {

            this.kardex?.setRelation( context );

        } );

        return this;
    }
}