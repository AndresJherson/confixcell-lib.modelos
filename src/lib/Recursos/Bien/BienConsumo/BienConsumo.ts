import { Bien, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class BienConsumo extends Bien {

    static override type = ModelType.BienConsumo;
    override type = ModelType.BienConsumo;


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


    static override initialize( data: OptionalModel<BienConsumo>[] ): BienConsumo[] {
        return data.map( item => new ( Prop.getClass<BienConsumo>( item ) ?? BienConsumo )( item ) )
    }
}