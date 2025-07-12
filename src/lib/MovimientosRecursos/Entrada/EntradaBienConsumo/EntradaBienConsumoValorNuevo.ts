import { EntradaBienConsumo, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumoValorNuevo extends EntradaBienConsumo {
    
    static override type = ModelType.EntradaBienConsumoValorNuevo;
    override type = ModelType.EntradaBienConsumoValorNuevo;


    constructor( item?: OptionalModel<EntradaBienConsumoValorNuevo> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaBienConsumoValorNuevo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaBienConsumoValorNuevo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}