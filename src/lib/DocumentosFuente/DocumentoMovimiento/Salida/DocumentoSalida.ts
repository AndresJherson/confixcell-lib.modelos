import { DocumentoMovimiento, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoSalida extends DocumentoMovimiento {
    static override type: string = 'DocumentoSalida';
    override type: string = DocumentoSalida.type;

    constructor( item?: Partial<DocumentoSalida> ) {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<DocumentoSalida>): this {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<DocumentoSalida>[] ): DocumentoSalida[] {
        return data.map( item => new ( Prop.GetClass<DocumentoSalida>( item ) ?? DocumentoSalida )( item ) )
    }
}