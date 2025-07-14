import { DateTime } from 'luxon';
import { Cast, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class KardexLock extends Model {

    static override type = ModelType.KardexLock;
    override type = ModelType.KardexLock;

    @Prop.Set() clave?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;

    get dataTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }


    constructor( item?: OptionalModel<KardexLock> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<KardexLock> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<KardexLock> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}