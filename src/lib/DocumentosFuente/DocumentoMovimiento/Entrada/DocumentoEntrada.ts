import { DocumentoMovimiento, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoEntrada extends DocumentoMovimiento {

    static override type = ModelType.DocumentoEntrada;
    override type = ModelType.DocumentoEntrada;


    constructor( item?: OptionalModel<DocumentoEntrada> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoEntrada> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoEntrada> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<DocumentoEntrada>[] ): Array<DocumentoEntrada | null> {
        return Prop.arrayInitialize( DocumentoEntrada, data );
    }
}