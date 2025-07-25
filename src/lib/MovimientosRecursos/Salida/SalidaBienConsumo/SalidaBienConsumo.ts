import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumo extends SalidaRecurso {

    static override type = ModelType.SalidaBienConsumo;
    override type = ModelType.SalidaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeCostoNeto?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;

    @Prop.Set()
    public get cantidadSaliente(): number | null | undefined { return this.#cantidadSaliente; }
    public set cantidadSaliente( value: number | null | undefined ) { this.#cantidadSaliente = value; }

    @Prop.Set()
    public get cantidadEntrante(): number | null | undefined { return this.#cantidadEntrante; }
    public set cantidadEntrante( value: number | null | undefined ) { this.#cantidadEntrante = value; }

    @Prop.Set()
    public get importeCostoUnitario(): number | null | undefined { return this.#importeCostoUnitario; }
    public set importeCostoUnitario( value: number | null | undefined ) { this.#importeCostoUnitario = value; }

    @Prop.Set()
    public get importeCostoNeto(): number | null | undefined { return this.#importeCostoNeto; }
    public set importeCostoNeto( value: number | null | undefined ) { this.#importeCostoNeto = value; }

    @Prop.Set()
    public get importeValorUnitario(): number | null | undefined { return this.#importeValorUnitario; }
    public set importeValorUnitario( value: number | null | undefined ) { this.#importeValorUnitario = value; }

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }

    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }

    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }
    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }
    get cantidadDisponible(): number | undefined { return this.decimalCantidadSaliente.minus( this.decimalCantidadEntrante ).toNumber(); };
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }


    constructor( item?: OptionalModel<SalidaBienConsumo> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: OptionalModel<SalidaBienConsumo>[] ): Array<SalidaBienConsumo | null> {
        return Prop.arrayInitialize( SalidaBienConsumo, data );
    }


    override set( item: OptionalModel<SalidaBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SalidaBienConsumo.type, () => {

            this.almacen?.setRelation( context );

            this.bienConsumo?.setRelation( context );

        } );

        return this;
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