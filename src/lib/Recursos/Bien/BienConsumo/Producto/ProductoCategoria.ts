import { Model, ModelType, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoCategoria extends Model {

    static override type = ModelType.ProductoCategoria;
    override type = ModelType.ProductoCategoria;

    @Prop.Set() nombre?: string;

    constructor( json?: Partial<ProductoCategoria> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<ProductoCategoria> ): this {
        return super.set( item as Partial<this> );
    }
}