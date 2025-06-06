import Decimal from 'decimal.js';
import { NotaVenta, Prop, PropBehavior, SalidaBienConsumo } from '../../../../../index';

@Prop.Class()
export class NotaVentaSalidaBienConsumo extends SalidaBienConsumo
{
    static override type: string = 'NotaVentaSalidaBienConsumo';
    override type: string = NotaVentaSalidaBienConsumo.type;


    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set() override cantidadSaliente: number = 0;
    @Prop.Set() override importePrecioUnitario: number = 0;
    @Prop.Set() importePrecioBruto: number = 0;
    @Prop.Set() importePrecioDescuento: number = 0;
    @Prop.Set() override importePrecioNeto: number = 0;

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
        super.procesarInformacion();

        try {
            this.importePrecioBruto = this.decimalImportePrecioUnitario
                .mul( this.cantidadSaliente )
                .toNumber();

            this.importePrecioNeto = this.decimalImportePrecioBruto
                .minus( this.importePrecioDescuento )
                .toNumber();

        }
        catch ( error ) {
            this.importePrecioBruto = 0;
            this.importePrecioNeto = 0;
        }

        return this;
    }
}