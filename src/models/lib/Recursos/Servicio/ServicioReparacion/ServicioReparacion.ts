import { ModelType, OptionalModel, Prop, PropBehavior, Recurso } from "../../../../index";

@Prop.Class()
export class ServicioReparacion extends Recurso {

    static override type = 'ServicioReparacion';
    override type = 'ServicioReparacion';
    private __ServicioReparacion!: 'ServicioReparacion';

    @Prop.Set() nombre?: string | null;

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