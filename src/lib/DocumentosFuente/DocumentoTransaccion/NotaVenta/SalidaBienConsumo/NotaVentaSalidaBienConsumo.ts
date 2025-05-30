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
    @Prop.Set() importeDescuento: number = 0;
    @Prop.Set() override importePrecioNeto: number = 0;

    get decimalImportePrecioBruto(): Decimal {
        return Prop.toDecimal( this.importePrecioBruto );
    }
    get decimalImporteDescuento(): Decimal {
        return Prop.toDecimal( this.importeDescuento );
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


    override setRelation( keys?: Parameters<SalidaBienConsumo['setRelation']>[0] ): this 
    {
        this.set({
            id: keys?.salidaBienConsumoId ?? this.id
        });
        if ( keys?.salidaBienConsumoId ) keys.salidaBienConsumoId++;

        return this;
    }


    override procesarInformacion(): this 
    {
        super.procesarInformacion();

        try {
            this.importePrecioBruto = new Decimal( this.importePrecioUnitario )
                .mul( this.cantidadSaliente )
                .toNumber();

            this.importePrecioNeto = new Decimal( this.importePrecioBruto )
                .minus( this.importeDescuento )
                .toNumber();

        }
        catch ( error ) {
            this.importePrecioBruto = 0;
            this.importePrecioNeto = 0;
        }

        return this;
    }
}