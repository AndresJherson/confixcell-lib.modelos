import Decimal from 'decimal.js';
import { NotaVenta, Prop, PropBehavior, SalidaBienConsumo } from '../../../../../index';

@Prop.Class()
export class NotaVentaSalidaBienConsumo extends SalidaBienConsumo
{
    static override type: string = 'NotaVentaSalidaBienConsumo';
    override type: string = NotaVentaSalidaBienConsumo.type;


    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set() override cantidadSaliente?: number;
    @Prop.Set() override importePrecioUnitario?: number;
    @Prop.Set() importePrecioBruto?: number;
    @Prop.Set() importePrecioDescuento?: number;
    @Prop.Set() override importePrecioNeto?: number;

    get decimalImportePrecioBruto(): Decimal {
        return Prop.toDecimal( this.importePrecioBruto );
    }
    get decimalImportePrecioDescuento(): Decimal {
        return Prop.toDecimal( this.importePrecioDescuento );
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
            this.importePrecioBruto = this.decimalImportePrecioUnitario
                .mul( this.cantidadSaliente ?? 0 )
                .toNumber();

            this.importePrecioNeto = this.decimalImportePrecioBruto
                .minus( this.importePrecioDescuento ?? 0 )
                .toNumber();

        }
        catch ( error ) {
            this.importePrecioBruto = 0;
            this.importePrecioNeto = 0;
        }

        super.procesarInformacion();

        return this;
    }
}