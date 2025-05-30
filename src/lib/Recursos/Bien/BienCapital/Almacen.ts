import { BienCapital, Model, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class Almacen extends Model
{
    static override type = 'Almacen';
    override type: string = Almacen.type;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new BienCapital( x ) ) bienCapital?: BienCapital;


    constructor( item?: Partial<Almacen> )
    {
        super();
        Prop.initialize( this, item );
    }
}