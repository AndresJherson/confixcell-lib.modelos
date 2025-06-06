import Decimal from 'decimal.js';
import { DocumentoMovimiento, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoSalida extends DocumentoMovimiento
{
    static override type: string = 'DocumentoSalida';
    override type: string = DocumentoSalida.type;

    constructor( item?: Partial<DocumentoSalida> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<DocumentoSalida>[] ): DocumentoSalida[]
    {
        return data.map( item => new ( Prop.GetClass<DocumentoSalida>( item ) ?? DocumentoSalida ) ( item ) )
    }
}