import { DocumentoTransaccion, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoIngreso extends DocumentoTransaccion {

    static override type = ModelType.DocumentoIngreso;
    override type = ModelType.DocumentoIngreso;

    constructor( item?: OptionalModel<DocumentoIngreso> ) {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: OptionalModel<DocumentoIngreso>[] ): Array<DocumentoTransaccion | null> {
        return Prop.arrayInitialize( DocumentoIngreso, data );
    }


    override set( item: OptionalModel<DocumentoIngreso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoIngreso> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}