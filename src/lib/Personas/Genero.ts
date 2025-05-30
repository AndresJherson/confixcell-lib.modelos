import { Model, Prop } from "../../index";

@Prop.Class()
export class Genero extends Model
{
    static override type = 'Genero';
    override type: string = Genero.type;

    @Prop.Set() nombre?: string;
    

    constructor( json?: Partial<Genero> )
    {
        super();
        Prop.initialize( this, json );
    }
}