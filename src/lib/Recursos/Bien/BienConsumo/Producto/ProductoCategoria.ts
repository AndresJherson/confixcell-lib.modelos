import { Model, Prop } from "../../../../../index";

@Prop.Class()
export class ProductoCategoria extends Model
{
    static override type = 'ProductoCategoria';
    override type: string = ProductoCategoria.type;

    @Prop.Set() nombre?: string;

    constructor( json?: Partial<ProductoCategoria> )
    {
        super();
        Prop.initialize( this, json );
    }
}