import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Prop, PropBehavior, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumo extends SalidaRecurso
{
    static override type: string = 'SalidaBienConsumo';
    override type: string = SalidaBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    
    @Prop.Set() cantidadSaliente: number = 0;
    @Prop.Set() importeValorUnitario: number = 0;
    @Prop.Set() importePrecioUnitario: number = 0;
    @Prop.Set() importePrecioNeto: number = 0;

    get decimalCantidadSaliente(): Decimal {
        return Prop.toDecimal( this.cantidadSaliente );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }
    get decimalImportePrecioUnitario(): Decimal {
        return Prop.toDecimal( this.importePrecioUnitario );
    }
    get decimalImportePrecioNeto(): Decimal {
        return Prop.toDecimal( this.importePrecioNeto );
    }

    @Prop.Set() cantidadEntrante: number = 0;
    get decimalCantidadEntrante(): Decimal {
        return Prop.toDecimal( this.cantidadEntrante );
    }
    
    get cantidadDisponible(): number {
        return this.decimalCantidadSaliente
            .minus( this.cantidadEntrante )
            .toNumber();
    };
    get decimalCantidadDisponible(): Decimal {
        return Prop.toDecimal( this.cantidadDisponible );
    }


    constructor( item?: Partial<SalidaBienConsumo> )
    {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<SalidaBienConsumo>[] ): SalidaBienConsumo[]
    {
        return data.map( item => new ( Prop.GetClass<SalidaBienConsumo>( item ) ?? SalidaBienConsumo ) ( item ) )
    }


    override set(item: Partial<SalidaBienConsumo>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: {
        salidaBienConsumoId: number
    }): this 
    {
        this.set({
            id: keys?.salidaBienConsumoId ?? this.id
        });
        if ( keys?.salidaBienConsumoId ) keys.salidaBienConsumoId++;

        return this;        
    }


    override procesarInformacion(): this 
    {
        try {
            this.set({
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.cantidadSaliente )
                    .toNumber(),
                importePrecioNeto: this.decimalImportePrecioUnitario
                    .mul( this.cantidadSaliente )
                    .toNumber(),
            });
        }
        catch ( error ) {
            this.set({
                importeValorNeto: 0,
                importePrecioNeto: 0
            });
        }
        
        return this;
    }
}