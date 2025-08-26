import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoCategoria extends Model {

    static override type: string = ModelType.ProductoCategoria;
    override type: string = ModelType.ProductoCategoria;

    @Prop.Set() nombre?: string | null;

    constructor( json?: OptionalModel<ProductoCategoria> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<ProductoCategoria> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ProductoCategoria> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}