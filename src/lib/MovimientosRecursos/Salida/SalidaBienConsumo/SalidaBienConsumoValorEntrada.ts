import { EntradaBienConsumo, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumoValorEntrada extends SalidaBienConsumo {

    static override type = ModelType.SalidaBienConsumoValorEntrada;
    override type = ModelType.SalidaBienConsumoValorEntrada;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => EntradaBienConsumo.initialize( [x] )[0] } ) entrada?: EntradaBienConsumo;


    constructor( item?: OptionalModel<SalidaBienConsumoValorEntrada> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaBienConsumoValorEntrada> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaBienConsumoValorEntrada> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context ); 

        context.execute( this, SalidaBienConsumoValorEntrada.type, () => {
            this.entrada?.setRelation( context );
        } );

        return this;
    }


    override procesarInformacion(): this {
        if ( this.entrada !== undefined ) {

            try {
                this.set( {
                    almacen: this.entrada.almacen,
                    importeCostoUnitario: this.entrada.importeValorUnitario
                } )
            }
            catch ( error ) {
                this.set( {
                    importeCostoUnitario: 0
                } );
            }
        }

        try {
            this.set( {
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.decimalCantidadSaliente )
                    .toNumber()
            } );
        }
        catch ( error ) {
            this.set( {
                importeValorNeto: 0
            } );
        }

        super.procesarInformacion();

        return this;
    }
}