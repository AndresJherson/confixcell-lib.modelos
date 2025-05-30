import { Model, Prop } from "../../../../../index";

@Prop.Class()
export class Magnitud extends Model
{
    static override type = 'Magnitud';
    override type: string = Magnitud.type;

    @Prop.Set() nombre?: string;


    constructor( json?: Partial<Magnitud> )
    {
        super();
        Prop.initialize( this, json );
    }
}