import { DocumentoFuente, DocumentoTransaccion, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class DocumentoMovimiento extends DocumentoFuente {

    static override type = ModelType.DocumentoMovimiento;
    override type = ModelType.DocumentoMovimiento;

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


    static override initialize( data: OptionalModel<DocumentoMovimiento>[] ): DocumentoMovimiento[] {
        return data.map( item => new ( Prop.getClass<DocumentoMovimiento>( item ) ?? DocumentoMovimiento )( item ) )
    }
}