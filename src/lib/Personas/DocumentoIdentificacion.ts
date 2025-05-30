import { Model, Prop } from '../../index';

@Prop.Class()
export class DocumentoIdentificacion extends Model
{
    static override type: string = 'DocumentoIdentificacion';
    override type: string = DocumentoIdentificacion.type;
    
    @Prop.Set() nombre?: string;

    constructor( item?: Partial<DocumentoIdentificacion> )
    {
        super();
        Prop.initialize( this, item );
    }
}