import { Model, ModelType, Prop } from "../../../../../index";

@Prop.Class()
export class Magnitud extends Model {

    static override type = ModelType.Magnitud;
    override type = ModelType.Magnitud;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<Magnitud> ) {
        super();
        Prop.initialize( this, json );
    }

    
    override set( item: Partial<Magnitud> ): this {
        return super.set( item as Partial<this> );
    }
}