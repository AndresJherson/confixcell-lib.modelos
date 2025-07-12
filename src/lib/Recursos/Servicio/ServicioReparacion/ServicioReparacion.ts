import { ModelType, OptionalModel, Prop, PropBehavior, Recurso } from "../../../../index";

@Prop.Class()
export class ServicioReparacion extends Recurso {

    static override type = ModelType.ServicioReparacion;
    override type = ModelType.ServicioReparacion;

    @Prop.Set() nombre?: string;
    @Prop.Set( { behavior: PropBehavior.boolean, getValue: () => true } ) override esSalida?: boolean = true;

    override get nombreCompleto() {
        return this.nombre;
    }


    constructor( json?: OptionalModel<ServicioReparacion> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<ServicioReparacion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ServicioReparacion> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}