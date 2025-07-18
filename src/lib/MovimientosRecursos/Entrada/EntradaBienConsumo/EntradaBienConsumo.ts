import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, EntradaRecurso, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumo extends EntradaRecurso {

    static override type = ModelType.EntradaBienConsumo;
    override type = ModelType.EntradaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    #cantidadEntrante?: number | null | undefined;
    #cantidadSaliente: number = 0;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;

    @Prop.Set()
    public get cantidadEntrante(): number | null | undefined { return this.#cantidadEntrante; }
    public set cantidadEntrante( value: number | null | undefined ) { this.#cantidadEntrante = value; }

    @Prop.Set()
    public get importeValorUnitario(): number | null | undefined { return this.#importeValorUnitario; }
    public set importeValorUnitario( value: number | null | undefined ) { this.#importeValorUnitario = value; }

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }

    @Prop.Set()
    public get cantidadSaliente(): number {return this.#cantidadSaliente;}
    public set cantidadSaliente( value: number ) {this.#cantidadSaliente = value;}
    
    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }
    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }
    get cantidadDisponible(): number { return this.decimalCantidadEntrante.minus( this.cantidadSaliente ).toNumber(); };
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }

    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }


    constructor( item?: OptionalModel<EntradaBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, EntradaBienConsumo.type, () => {

            this.almacen?.setRelation( context );
            this.bienConsumo?.setRelation( context );

        } );

        return this;
    }


    static override initialize( data: OptionalModel<EntradaBienConsumo>[] ): EntradaBienConsumo[] {
        return data.map( item => new ( Prop.getClass<EntradaBienConsumo>( item ) ?? EntradaBienConsumo )( item ) )
    }


    override procesarInformacion(): this {
        try {
            this.set( {
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.decimalCantidadEntrante )
                    .toNumber()
            } );
        }
        catch ( error ) {
            this.set( {
                importeValorNeto: 0
            } );
        }

        return this;
    }
}