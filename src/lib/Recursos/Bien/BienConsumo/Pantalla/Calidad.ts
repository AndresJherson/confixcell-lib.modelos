import { Model, Prop } from "../../../../../index";

@Prop.Class()
export class Calidad extends Model
{
    static override type = 'Calidad';
    override type = Calidad.type;
    
    @Prop.Set() nombre?: string;


    constructor( json?: Partial<Calidad> )
    {
        super();
        Prop.initialize( this, json );
    }
}