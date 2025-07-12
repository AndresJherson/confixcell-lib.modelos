import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, EntradaRecurso, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumo extends EntradaRecurso {

    static override type = ModelType.EntradaBienConsumo;
    override type = ModelType.EntradaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo;

    @Prop.Set() cantidadEntrante?: number;
    @Prop.Set() importeValorUnitario?: number;
    @Prop.Set() override importeValorNeto?: number;

    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }

    @Prop.Set() cantidadSaliente: number = 0;
    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }

    get cantidadDisponible(): number { return this.decimalCantidadEntrante.minus( this.cantidadSaliente ).toNumber(); };
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }


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