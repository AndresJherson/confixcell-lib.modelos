import { Model, ModelType, OptionalModel, Prop } from "../../index";

@Prop.Class()
export class Genero extends Model {
    static override type = 'Genero';
    override type = 'Genero';
    private __Genero!: 'Genero';

    @Prop.Set() nombre?: string | null;


    constructor( json?: OptionalModel<Genero> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Genero> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Genero> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}