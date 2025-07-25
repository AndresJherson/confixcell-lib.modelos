import { DocumentoMovimiento, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class DocumentoSalida extends DocumentoMovimiento {

    static override type = ModelType.DocumentoSalida;
    override type = ModelType.DocumentoSalida;

    constructor( item?: OptionalModel<DocumentoSalida> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoSalida> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoSalida> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<DocumentoSalida>[] ): Array<DocumentoSalida | null> {
        return Prop.arrayInitialize( DocumentoSalida, data );
    }
}