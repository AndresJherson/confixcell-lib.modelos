import { Model, ModelType, OptionalModel, Prop } from "../../../../../index";

@Prop.Class()
export class Calidad extends Model {

    static override type: string = ModelType.Calidad;
    override type: string = ModelType.Calidad;

    @Prop.Set() nombre?: string | null;


    constructor( json?: OptionalModel<Calidad> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Calidad> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Calidad> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}