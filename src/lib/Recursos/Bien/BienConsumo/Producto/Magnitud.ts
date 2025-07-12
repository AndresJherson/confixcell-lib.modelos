import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class Magnitud extends Model {

    static override type = ModelType.Magnitud;
    override type = ModelType.Magnitud;

    @Prop.Set() nombre?: string;


    constructor( json?: OptionalModel<Magnitud> ) {
        super();
        Prop.initialize( this, json );
    }

    
    override set( item: OptionalModel<Magnitud> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Magnitud> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}