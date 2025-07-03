import { ModelType, Prop, PropBehavior, Recurso } from "../../../../index";

@Prop.Class()
export class ServicioReparacion extends Recurso {

    static override type = ModelType.ServicioReparacion;
    override type = ModelType.ServicioReparacion;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.boolean, () => true ) override esSalida?: boolean = true;

    override get nombreCompleto() {
        return this.nombre;
    }


    constructor( json?: Partial<ServicioReparacion> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<ServicioReparacion> ): this {
        return super.set( item as Partial<this> );
    }
}