import Decimal from 'decimal.js';
import { Cast, DocumentoFuente, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class MovimientoRecurso extends Model {

    static override type: string = ModelType.MovimientoRecurso;
    override type: string = ModelType.MovimientoRecurso;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => DocumentoFuente.initialize( [x] )[0] } ) documentoFuente?: DocumentoFuente | null;
    @Prop.Set() numero?: number | null;

    get codigoDocumentoFuente(): string | undefined {
        const codigoDocumentoFuente = this.documentoFuente?.codigoCompleto ?? '';
        const numero = this.numero?.toString() ?? '';
        const separator = codigoDocumentoFuente && numero ? ' ' : '';

        const codigo = `${codigoDocumentoFuente}${separator}${numero}`.trim();
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


    static override initialize<TModel extends MovimientoRecurso, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( MovimientoRecurso, data );
    }


    procesarInformacion(): this {
        return this;
    }
}