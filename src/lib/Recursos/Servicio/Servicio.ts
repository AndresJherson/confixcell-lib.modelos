import { ModelType, OptionalModel, Prop, Recurso } from "../../../index";

@Prop.Class()
export class Servicio extends Recurso {

    static override type = ModelType.Servicio;
    override type = ModelType.Servicio;


    constructor( json?: OptionalModel<Servicio> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Servicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Servicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}