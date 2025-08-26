import { Bien, ModelType, OptionalModel, Prop, Recurso } from '../../../../index';

@Prop.Class()
export class BienConsumo extends Bien {

    static override type: string = ModelType.BienConsumo;
    override type: string = ModelType.BienConsumo;


    constructor( item?: OptionalModel<BienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }

    
    override set( item: OptionalModel<BienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<BienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize<TModel extends BienConsumo, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( BienConsumo, data );
    }
}