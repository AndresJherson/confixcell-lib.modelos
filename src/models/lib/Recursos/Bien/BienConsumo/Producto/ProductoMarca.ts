import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoMarca extends Model {

    static override type = 'ProductoMarca';
    override type = 'ProductoMarca';
    private __ProductoMarca!: 'ProductoMarca';

    @Prop.Set() nombre?: string | null;

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