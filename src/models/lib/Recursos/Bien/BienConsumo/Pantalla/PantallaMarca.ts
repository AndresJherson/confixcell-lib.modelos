import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class PantallaMarca extends Model {

    static override type = 'PantallaMarca';
    override type = 'PantallaMarca';
    private __PantallaMarca!: 'PantallaMarca';

    @Prop.Set() nombre?: string | null;


    constructor( json?: OptionalModel<PantallaMarca> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<PantallaMarca> ): this {
        return super.set( item as OptionalModel<this> );
    }

    
    override assign( item: OptionalModel<PantallaMarca> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}