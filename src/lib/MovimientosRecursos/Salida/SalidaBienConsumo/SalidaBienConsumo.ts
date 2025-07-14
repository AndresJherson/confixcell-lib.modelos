import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumo extends SalidaRecurso {

    static override type = ModelType.SalidaBienConsumo;
    override type = ModelType.SalidaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    @Prop.Set() cantidadSaliente?: number | null;
    @Prop.Set() importeCostoUnitario?: number | null;
    @Prop.Set() importeCostoNeto?: number | null;
    @Prop.Set() importeValorUnitario?: number | null;
    @Prop.Set() override importeValorNeto?: number | null;

    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }
    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }

    @Prop.Set() cantidadEntrante?: number | null;
    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }

    get cantidadDisponible(): number | undefined { return this.decimalCantidadSaliente.minus( this.decimalCantidadEntrante ).toNumber(); };
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }


    constructor( item?: OptionalModel<SalidaBienConsumo> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: OptionalModel<SalidaBienConsumo>[] ): SalidaBienConsumo[] {
        return data.map( item => new ( Prop.getClass<SalidaBienConsumo>( item ) ?? SalidaBienConsumo )( item ) )
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