import { DocumentoMovimiento, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoEntrada extends DocumentoMovimiento
{
    static override type: string = 'DocumentoEntrada';
    override type: string = DocumentoEntrada.type;
    

    constructor( item?: Partial<DocumentoEntrada> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<DocumentoEntrada>[] ): DocumentoEntrada[]
    {
        return data.map( item => new ( Prop.GetClass<DocumentoEntrada>( item ) ?? DocumentoEntrada ) ( item ) )
    }
}