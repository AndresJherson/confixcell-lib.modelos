import { Model, ModelType, Prop } from "../../index";

@Prop.Class()
export class Genero extends Model {
    static override type = ModelType.Genero;
    override type: string = ModelType.Genero;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<Genero> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<Genero> ): this {
        return super.set( item as Partial<this> );
    }
}