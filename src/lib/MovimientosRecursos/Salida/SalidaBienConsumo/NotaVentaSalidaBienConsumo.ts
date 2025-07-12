import Decimal from 'decimal.js';
import { Cast, ExecutionContext, ModelType, NotaVenta, OptionalModel, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class NotaVentaSalidaBienConsumo extends SalidaBienConsumo {

    static override type = ModelType.NotaVentaSalidaBienConsumo;
    override type = ModelType.NotaVentaSalidaBienConsumo;


    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVenta( x ) } ) override documentoFuente?: NotaVenta;
    @Prop.Set() override cantidadSaliente?: number;
    @Prop.Set() override importeValorUnitario?: number;
    @Prop.Set() importeValorBruto?: number;
    @Prop.Set() importeValorDescuento?: number;
    @Prop.Set() override importeValorNeto?: number;

    get decimalImporteValorBruto(): Decimal { return Cast.toDecimal( this.importeValorBruto ); }
    get decimalImporteValorDescuento(): Decimal { return Cast.toDecimal( this.importeValorDescuento ); }


    constructor( item?: OptionalModel<NotaVentaSalidaBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaSalidaBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaSalidaBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override procesarInformacion(): this {
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