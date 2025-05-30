import { Model, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoMarca extends Model
{
    static override type = 'ProductoMarca';
    override type: string = ProductoMarca.type;

    @Prop.Set() nombre?: string;

    constructor( json?: Partial<ProductoMarca> )
    {
        super();
        Prop.initialize( this, json );
    }
}