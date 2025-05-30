import { Model, Prop } from '../../../../index';

@Prop.Class()
export class NotaVentaCategoriaReparacion extends Model
{
    static override type: string = 'NotaVentaCategoriaReparacion';
    override type: string = NotaVentaCategoriaReparacion.type;

    @Prop.Set() nombre?: string;
    
    constructor( item?: Partial<NotaVentaCategoriaReparacion> )
    {
        super();
        Prop.initialize( this, item );
    }
}