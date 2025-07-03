import Decimal from 'decimal.js';
import { NotaVenta, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class NotaVentaSalidaBienConsumo extends SalidaBienConsumo
{
    static override type: string = 'NotaVentaSalidaBienConsumo';
    override type: string = NotaVentaSalidaBienConsumo.type;


    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set() override cantidadSaliente?: number;
    @Prop.Set() override importeValorUnitario?: number;
    @Prop.Set() importeValorBruto?: number;
    @Prop.Set() importeValorDescuento?: number;
    @Prop.Set() override importeValorNeto?: number;

    get decimalImporteValorBruto(): Decimal {
        return Prop.toDecimal( this.importeValorBruto );
    }
    get decimalImporteValorDescuento(): Decimal {
        return Prop.toDecimal( this.importeValorDescuento );
    }


    constructor( item?: Partial<NotaVentaSalidaBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaVentaSalidaBienConsumo>): this 
    {
        return super.set( item as Partial<this> );
    }


    override procesarInformacion(): this 
    {
        try {
            this.importeValorBruto = this.decimalImporteValorUnitario
                .mul( this.cantidadSaliente ?? 0 )
                .toNumber();

            this.importeValorNeto = this.decimalImporteValorBruto
                .minus( this.importeValorDescuento ?? 0 )
                .toNumber();

        }
        catch ( error ) {
            this.importeValorBruto = 0;
            this.importeValorNeto = 0;
        }

        super.procesarInformacion();

        return this;
    }
}