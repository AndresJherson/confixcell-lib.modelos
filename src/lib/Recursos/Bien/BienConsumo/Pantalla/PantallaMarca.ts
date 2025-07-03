import { Model, ModelType, Prop } from "../../../../../index";

@Prop.Class()
export class PantallaMarca extends Model {

    static override type = ModelType.PantallaMarca;
    override type = ModelType.PantallaMarca;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<PantallaMarca> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<PantallaMarca> ): this {
        return super.set( item as Partial<this> );
    }
}