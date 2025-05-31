import Decimal from 'decimal.js';
import { Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaProduccion extends SalidaRecurso
{
    static override type: string = 'SalidaProduccion';
    override type: string = SalidaProduccion.type;

    @Prop.Set() importePrecioNeto: number = 0;
    get decimalImportePrecioNeto(): Decimal {
        return Prop.toDecimal( this.importePrecioNeto );
    }

    constructor( item?: Partial<SalidaProduccion> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccion>): this 
    {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<SalidaProduccion>[] ): SalidaProduccion[]
    {
        return data.map( item => new ( Prop.GetClass<SalidaProduccion>( item ) ?? SalidaProduccion ) ( item ) )
    }
}