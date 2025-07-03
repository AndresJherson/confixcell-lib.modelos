import { Model, ModelType, Prop } from "../../../../../index";

@Prop.Class()
export class Calidad extends Model {

    static override type = ModelType.Calidad;
    override type = ModelType.Calidad;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<Calidad> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<Calidad> ): this {
        return super.set( item as Partial<this> );
    }
}