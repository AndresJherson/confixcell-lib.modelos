import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Prop, PropBehavior, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumo extends SalidaRecurso {
    static override type: string = 'SalidaBienConsumo';
    override type: string = SalidaBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new Almacen( x ) ) almacen?: Almacen;
    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;

    @Prop.Set() cantidadSaliente?: number;
    @Prop.Set() importeCostoUnitario?: number;
    @Prop.Set() importeCostoNeto?: number;
    @Prop.Set() importeValorUnitario?: number;
    @Prop.Set() override importeValorNeto?: number;

    get decimalCantidadSaliente(): Decimal {
        return Prop.toDecimal( this.cantidadSaliente );
    }
    get decimalImporteCostoUnitario(): Decimal {
        return Prop.toDecimal( this.importeCostoUnitario );
    }
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }

    @Prop.Set() cantidadEntrante?: number;
    get decimalCantidadEntrante(): Decimal {
        return Prop.toDecimal( this.cantidadEntrante );
    }

    get cantidadDisponible(): number | undefined {
        return this.decimalCantidadSaliente
            .minus( this.cantidadEntrante ?? 0 )
            .toNumber();
    };
    get decimalCantidadDisponible(): Decimal {
        return Prop.toDecimal( this.cantidadDisponible );
    }


    constructor( item?: Partial<SalidaBienConsumo> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<SalidaBienConsumo>[] ): SalidaBienConsumo[] {
        return data.map( item => new ( Prop.GetClass<SalidaBienConsumo>( item ) ?? SalidaBienConsumo )( item ) )
    }


    override set( item: Partial<SalidaBienConsumo> ): this {
        return super.set( item as Partial<this> );
    }


    override procesarInformacion(): this {
        try {
            this.set( {
                importeCostoNeto: this.decimalImporteCostoUnitario
                    .mul( this.decimalCantidadSaliente )
                    .toNumber()
            } );
        }
        catch ( error ) {
            this.set( {
                importeCostoNeto: 0
            } );
        }

        return this;
    }
}