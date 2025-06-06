import Decimal from 'decimal.js';
import { MovimientoRecurso, Prop } from '../../../index';

@Prop.Class()
export class EntradaRecurso extends MovimientoRecurso
{
    static override type: string = 'EntradaRecurso';
    override type: string = EntradaRecurso.type;


    constructor( item?: Partial<EntradaRecurso> )
    {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<EntradaRecurso>[] ): EntradaRecurso[]
    {
        return data.map( item => new ( Prop.GetClass<EntradaRecurso>( item ) ?? EntradaRecurso ) ( item ) )
    }
}