import { Model, Prop } from '../../../../index';

@Prop.Class()
export class NotaVentaEstado extends Model
{
    static override type: string = 'NotaVentaEstado';
    override type: string = NotaVentaEstado.type;

    @Prop.Set() nombre?: string;

    constructor( item?: Partial<NotaVentaEstado> )
    {
        super();
        Prop.initialize( this, item );
    }
}