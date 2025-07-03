import { ModelType, Prop, Recurso } from "../../../index";

@Prop.Class()
export class Servicio extends Recurso {

    static override type = ModelType.Servicio;
    override type = ModelType.Servicio;


    constructor( json?: Partial<Servicio> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<Servicio> ): this {
        return super.set( item as Partial<this> );
    }
}