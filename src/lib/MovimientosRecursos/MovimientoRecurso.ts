import Decimal from 'decimal.js';
import { DocumentoFuente, Model, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class MovimientoRecurso extends Model
{
    static override type: string = 'MovimientoRecurso';
    override type: string = MovimientoRecurso.type;

    @Prop.Set( PropBehavior.model, x => new DocumentoFuente( x ) ) documentoFuente?: DocumentoFuente;
    get codigoDocumentoFuente(): string {
        const codigoDocumentoFuente = this.documentoFuente?.codigoCompleto ?? '';
        const id = this.id !== undefined ? this.id.toString() : '';
        const separator = codigoDocumentoFuente && id ? ' / ' : '';
        return `${codigoDocumentoFuente}${separator}${id}`;
    }

    
    get importeNeto(): number {
        return 0;
    }
    get decimalImporteNeto(): Decimal {
        return Prop.toDecimal( this.importeNeto );
    }
    

    constructor( item?: Partial<MovimientoRecurso> )
    {
        super()
        Prop.initialize( this, item );
    }


    static initialize( data: Partial<MovimientoRecurso>[] ): MovimientoRecurso[]
    {
        return data.map( item => new ( Prop.GetClass<MovimientoRecurso>( item ) ?? MovimientoRecurso ) ( item ) )
    }


    procesarInformacion(): this
    {
        return this;
    }
}