import { DocumentoTransaccion, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoEgreso extends DocumentoTransaccion {

    static override type: string = ModelType.DocumentoEgreso;
    override type: string = ModelType.DocumentoEgreso;

    constructor( item?: OptionalModel<DocumentoEgreso> ) {
        super();
        Prop.initialize( this, item );
    }


    static override initialize<TModel extends DocumentoEgreso, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( DocumentoEgreso, data );
    }


    override set( item: OptionalModel<DocumentoEgreso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoEgreso> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}