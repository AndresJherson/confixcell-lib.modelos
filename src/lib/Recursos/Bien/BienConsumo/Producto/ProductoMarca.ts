import { Model, ModelType, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoMarca extends Model {

    static override type = ModelType.ProductoMarca;
    override type = ModelType.ProductoMarca;

    @Prop.Set() nombre?: string;

    constructor( json?: Partial<ProductoMarca> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<ProductoMarca> ): this {
        return super.set( item as Partial<this> );
    }
}