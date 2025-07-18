import Decimal from 'decimal.js';
import { Cast, ExecutionContext, ModelType, NotaVenta, OptionalModel, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class NotaVentaSalidaBienConsumo extends SalidaBienConsumo {

    static override type = ModelType.NotaVentaSalidaBienConsumo;
    override type = ModelType.NotaVentaSalidaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVenta( x ) } ) override documentoFuente?: NotaVenta | null;

    #cantidadSaliente?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorBruto?: number | null | undefined;
    #importeValorDescuento?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;

    @Prop.Set()
    public override get cantidadSaliente(): number | null | undefined { return this.#cantidadSaliente; }
    public override set cantidadSaliente( value: number | null | undefined ) { this.#cantidadSaliente = value; }

    @Prop.Set()
    public override get importeValorUnitario(): number | null | undefined { return this.#importeValorUnitario; }
    public override set importeValorUnitario( value: number | null | undefined ) { this.#importeValorUnitario = value; }

    @Prop.Set()
    public get importeValorBruto(): number | null | undefined { return this.#importeValorBruto; }
    public set importeValorBruto( value: number | null | undefined ) { this.#importeValorBruto = value; }

    @Prop.Set()
    public get importeValorDescuento(): number | null | undefined { return this.#importeValorDescuento; }
    public set importeValorDescuento( value: number | null | undefined ) { this.#importeValorDescuento = value; }

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }

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