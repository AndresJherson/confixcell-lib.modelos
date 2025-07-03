import { Model, ModelType, Prop } from "../../../../index";

@Prop.Class()
export class ServicioEstandarCategoria extends Model {
    
    static override type = ModelType.ServicioEstandarCategoria;
    override type = ModelType.ServicioEstandarCategoria;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<ServicioEstandarCategoria> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<ServicioEstandarCategoria> ): this {
        return super.set( item as Partial<this> );
    }
}