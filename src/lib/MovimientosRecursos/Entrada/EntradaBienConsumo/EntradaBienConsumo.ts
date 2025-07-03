import Decimal from 'decimal.js';
import { Almacen, BienConsumo, EntradaRecurso, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumo extends EntradaRecurso
{
    static override type: string = 'EntradaBienConsumo';
    override type: string = EntradaBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    
    @Prop.Set() cantidadEntrante?: number;
    @Prop.Set() importeValorUnitario?: number;
    @Prop.Set() override importeValorNeto?: number;

    get decimalCantidadEntrante(): Decimal {
        return Prop.toDecimal( this.cantidadEntrante );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }

    @Prop.Set() cantidadSaliente: number = 0;
    get decimalCantidadSaliente(): Decimal {
        return Prop.toDecimal( this.cantidadSaliente );
    }
    
    get cantidadDisponible(): number {
        return this.decimalCantidadEntrante
            .minus( this.cantidadSaliente )
            .toNumber();
    };
    get decimalCantidadDisponible(): Decimal {
        return Prop.toDecimal( this.cantidadDisponible );
    }


    constructor( item?: Partial<EntradaBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<EntradaBienConsumo>[] ): EntradaBienConsumo[]
    {
        return data.map( item => new ( Prop.GetClass<EntradaBienConsumo>( item ) ?? EntradaBienConsumo ) ( item ) )
    }


    override set(item: Partial<EntradaBienConsumo>): this 
    {
        return super.set( item as Partial<this> );
    }


    override procesarInformacion(): this 
    {
        try {
            this.set({
                importeValorNeto: this.decimalImporteValorUnitario
                                    .mul( this.decimalCantidadEntrante )
                                    .toNumber()
            });
        }
        catch ( error ) {
            this.set({
                importeValorNeto: 0
            });
        }
        
        return this;
    }
}