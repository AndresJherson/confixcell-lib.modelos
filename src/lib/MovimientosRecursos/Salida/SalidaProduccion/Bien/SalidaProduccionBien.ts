import Decimal from 'decimal.js';
import { BienConsumo, Cast, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccion } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionBien extends SalidaProduccion {

    static override type = ModelType.SalidaProduccionBien;
    override type = ModelType.SalidaProduccionBien;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    @Prop.Set() cantidadSaliente?: number | null;
    @Prop.Set() importeCostoUnitario?: number | null;
    @Prop.Set() importeValorUnitario?: number | null;

    get decimalCantidadSaliente(): Decimal { return Cast.toDecimal( this.cantidadSaliente ); }
    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }

    @Prop.Set() cantidadEntrante?: number | null;
    get decimalCantidadEntrante(): Decimal { return Cast.toDecimal( this.cantidadEntrante ); }

    get cantidadDisponible(): number { return this.decimalCantidadSaliente.minus( this.cantidadEntrante ?? 0 ).toNumber(); }
    get decimalCantidadDisponible(): Decimal { return Cast.toDecimal( this.cantidadDisponible ); }


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


    static override initialize( data: OptionalModel<SalidaProduccionBien>[] ): SalidaProduccionBien[] {
        return data.map( item =>
            new (
                Prop.getClass<SalidaProduccionBien>( item )
                ?? SalidaProduccionBien
            )( item )
        )
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