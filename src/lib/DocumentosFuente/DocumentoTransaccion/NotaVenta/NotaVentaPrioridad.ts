import { Model, Prop } from '../../../../index';

@Prop.Class()
export class NotaVentaPrioridad extends Model
{
    static override type: string = 'NotaVentaPrioridad';
    override type: string = NotaVentaPrioridad.type;

    @Prop.Set() nombre?: string;

    constructor( item?: Partial<NotaVentaPrioridad> )
    {
        super();
        Prop.initialize( this, item );
    }
}