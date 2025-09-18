import { DocumentoFuente, DocumentoTransaccion, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class DocumentoMovimiento extends DocumentoFuente {

    static override type = 'DocumentoMovimiento';
    override type = 'DocumentoMovimiento';
    private __DocumentoMovimiento!: 'DocumentoMovimiento';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => DocumentoTransaccion.initialize( [x] )[0] } ) documentoTransaccion?: DocumentoTransaccion | null;


    constructor( item?: OptionalModel<DocumentoMovimiento> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoMovimiento> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoMovimiento> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoMovimiento.type, () => {

            this.documentoTransaccion?.setRelation( context );

        } );

        return this;
    }


    static override initialize<TModel extends DocumentoMovimiento, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( DocumentoMovimiento, data );
    }
}