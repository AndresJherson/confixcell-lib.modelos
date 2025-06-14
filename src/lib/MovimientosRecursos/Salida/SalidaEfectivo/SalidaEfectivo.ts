import Decimal from 'decimal.js';
import { Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaEfectivo extends SalidaRecurso
{
    static override type: string = 'SalidaEfectivo';
    override type: string = SalidaEfectivo.type;

    @Prop.Set() override importeValorNeto?: number;
    
    constructor( item?: Partial<SalidaEfectivo> )
    {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<SalidaEfectivo>[] ): SalidaEfectivo[]
    {
        return data.map( item => new ( Prop.GetClass<SalidaEfectivo>( item ) ?? SalidaEfectivo ) ( item ) )
    }


    override set(item: Partial<SalidaEfectivo>): this {
        return super.set( item as Partial<this> );
    }
}