import { Model, Prop, PropBehavior } from "../../index";

export class Politica extends Model
{
    static override type = 'Politica';
    override type: string = Politica.type;
    
    @Prop.Set() descripcion?: string;
    @Prop.Set( PropBehavior.boolean ) esActivo?: boolean;

    constructor( item?: Partial<Politica> )
    {
        super();
        Prop.initialize( this, item );
    }
}