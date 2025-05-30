import { Model, PantallaMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModelo extends Model
{
    static override type = 'PantallaModelo';
    override type = PantallaModelo.type;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new PantallaMarca( x ) ) marca?: PantallaMarca;
    
    get nombreCompleto(): string
    {
        return `${this.marca?.nombre ?? ''} ${this.nombre ?? ''}`.trim();
    }

    constructor( json?: Partial<PantallaModelo> )
    {
        super();
        Prop.initialize( this, json );
    }
}