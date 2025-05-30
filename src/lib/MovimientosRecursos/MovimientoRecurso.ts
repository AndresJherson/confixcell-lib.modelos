import Decimal from 'decimal.js';
import { DocumentoFuente, Model, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class MovimientoRecurso extends Model
{
    static override type: string = 'MovimientoRecurso';
    override type: string = MovimientoRecurso.type;

    @Prop.Set( PropBehavior.model, x => new DocumentoFuente( x ) ) documentoFuente?: DocumentoFuente;

    @Prop.Set() importeValorNeto: number = 0;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
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