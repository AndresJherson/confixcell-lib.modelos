import Decimal from 'decimal.js';
import { DocumentoFuente, Model, ModelType, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class MovimientoRecurso extends Model {

    static override type: string = ModelType.MovimientoRecurso;
    override type = ModelType.MovimientoRecurso;

    @Prop.Set( PropBehavior.model, x => new DocumentoFuente( x ) ) documentoFuente?: DocumentoFuente;
    get codigoDocumentoFuente(): string | undefined {
        const codigoDocumentoFuente = this.documentoFuente?.codigoCompleto ?? '';
        const id = this.id !== undefined ? this.id.toString() : '';
        const separator = codigoDocumentoFuente && id ? ' / ' : '';

        const codigo = `${codigoDocumentoFuente}${separator}${id}`.trim();
        return codigo ? codigo : undefined;
    }

    @Prop.Set() importeValorNeto?: number;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }


    constructor( item?: Partial<MovimientoRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<MovimientoRecurso> ): this {
        return super.set( item as Partial<this> );
    }


    static initialize( data: Partial<MovimientoRecurso>[] ): MovimientoRecurso[] {
        return data.map( item => new ( Prop.GetClass<MovimientoRecurso>( item ) ?? MovimientoRecurso )( item ) )
    }


    procesarInformacion(): this {
        return this;
    }
}