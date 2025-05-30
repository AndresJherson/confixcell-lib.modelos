import { Model, Prop } from "../../../index";

@Prop.Class()
export class ServicioCategoria extends Model
{
    static override type = 'ServicioCategoria';
    override type: string = ServicioCategoria.type;

    @Prop.Set() nombre?: string;
    

    constructor( json?: Partial<ServicioCategoria> )
    {
        super();
        Prop.initialize( this, json );
    }
}