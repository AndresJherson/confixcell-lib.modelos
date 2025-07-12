import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoMarca extends Model {

    static override type = ModelType.ProductoMarca;
    override type = ModelType.ProductoMarca;

    @Prop.Set() nombre?: string;

    constructor( json?: OptionalModel<ProductoMarca> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<ProductoMarca> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ProductoMarca> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}