import { Prop, PropBehavior, Recurso, ServicioCategoria } from "../../../index";

@Prop.Class()
export class Servicio extends Recurso
{
    static override type = 'Servicio';
    override type: string = Servicio.type;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new ServicioCategoria( x ) ) categoria?: ServicioCategoria;

    override get nombreCompleto() {
        return this.nombre ?? '';
    }


    constructor( json?: Partial<Servicio> )
    {
        super();
        Prop.initialize( this, json );
    }
}