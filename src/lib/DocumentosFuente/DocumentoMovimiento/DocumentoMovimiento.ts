import { DocumentoFuente, DocumentoTransaccion, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class DocumentoMovimiento extends DocumentoFuente
{
    static override type = 'DocumentoMovimiento';
    override type = DocumentoMovimiento.type;

    @Prop.Set( PropBehavior.model, x => new DocumentoTransaccion( x ) ) documentoTransaccion?: DocumentoTransaccion;


    constructor( item?: Partial<DocumentoMovimiento> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<DocumentoMovimiento>[] ): DocumentoMovimiento[]
    {
        return data.map( item => new ( Prop.GetClass<DocumentoMovimiento>( item ) ?? DocumentoMovimiento ) ( item ) )
    }
}