import Decimal from 'decimal.js';
import { BienConsumo, Cast, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccion } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionBien extends SalidaProduccion {

    static override type: string = ModelType.SalidaProduccionBien;
    override type: string = ModelType.SalidaProduccionBien;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;

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
    public get importeValorUnitario(): number | null | undefined { return this.#importeValorUnitario; }
    public set importeValorUnitario( value: number | null | undefined ) { this.#importeValorUnitario = value; }

    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }
    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }
    get cantidadDisponible(): number { return this.decimalCantidadSaliente.minus( this.cantidadEntrante ?? 0 ).toNumber(); }
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }

    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }




    constructor( item?: OptionalModel<SalidaProduccionBien> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBien> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBien> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SalidaProduccionBien.type, () => {
            this.bienConsumo?.setRelation( context );
        } )

        return this;
    }


    static override initialize<TModel extends SalidaProduccionBien, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( SalidaProduccionBien, data );
    }


    // calcular valores netos
    override procesarInformacion(): this {
        try {

            this.set( {
                importeCostoNeto: this.decimalImporteCostoUnitario
                    .mul( this.decimalCantidadSaliente )
                    .toNumber(),
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.decimalCantidadSaliente )
                    .toNumber()
            } );

        }
        catch ( error ) {
            this.set( {
                importeCostoNeto: 0,
                importeValorNeto: 0
            } );
        }


        return this;
    }
}