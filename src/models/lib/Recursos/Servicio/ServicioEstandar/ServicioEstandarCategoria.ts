import { Model, ModelType, OptionalModel, Prop } from "../../../../index";

@Prop.Class()
export class ServicioEstandarCategoria extends Model {
    
    static override type = 'ServicioEstandarCategoria';
    override type = 'ServicioEstandarCategoria';
    private __ServicioEstandarCategoria!: 'ServicioEstandarCategoria';

    @Prop.Set() nombre?: string | null;


    constructor( json?: OptionalModel<ServicioEstandarCategoria> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<ServicioEstandarCategoria> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ServicioEstandarCategoria> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}