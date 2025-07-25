import Decimal from 'decimal.js';
import { Cast, DocumentoFuente, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class MovimientoRecurso extends Model {

    static override type: string = ModelType.MovimientoRecurso;
    override type = ModelType.MovimientoRecurso;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new DocumentoFuente( x ) } ) documentoFuente?: DocumentoFuente | null;

    get codigoDocumentoFuente(): string | undefined {
        const codigoDocumentoFuente = this.documentoFuente?.codigoCompleto ?? '';
        const id = this.id != null ? this.id.toString() : '';
        const separator = codigoDocumentoFuente && id ? ' / ' : '';

        const codigo = `${codigoDocumentoFuente}${separator}${id}`.trim();
        return codigo ? codigo : undefined;
    }

    #importeValorNeto?: number | null | undefined;
    @Prop.Set()
    get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }
    get decimalImporteValorNeto(): Decimal { return Cast.toDecimal( this.importeValorNeto ); }


    constructor( item?: OptionalModel<MovimientoRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<MovimientoRecurso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<MovimientoRecurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, MovimientoRecurso.type, () => {
            this.documentoFuente?.setRelation( context );
        } );

        return this;
    }


    static override initialize( data: OptionalModel<MovimientoRecurso>[] ): Array<MovimientoRecurso | null> {
        return Prop.arrayInitialize( MovimientoRecurso, data );
    }


    procesarInformacion(): this {
        return this;
    }
}