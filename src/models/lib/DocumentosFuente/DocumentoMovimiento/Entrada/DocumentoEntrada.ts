import { DocumentoMovimiento, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoEntrada extends DocumentoMovimiento {

    static override type = 'DocumentoEntrada';
    override type = 'DocumentoEntrada';
    private __DocumentoEntrada!: 'DocumentoEntrada';


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


    static override initialize<TModel extends DocumentoEntrada, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( DocumentoEntrada, data );
    }
}