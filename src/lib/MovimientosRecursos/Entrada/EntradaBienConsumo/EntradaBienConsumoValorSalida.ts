import { EntradaBienConsumo, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumoValorSalida extends EntradaBienConsumo {

    static override type = ModelType.EntradaBienConsumoValorSalida;
    override type = ModelType.EntradaBienConsumoValorSalida;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => SalidaBienConsumo.initialize( [x] )[0] } ) salida?: SalidaBienConsumo;


    constructor( item?: OptionalModel<EntradaBienConsumoValorSalida> ) {
        super()
        Prop.initialize( this, item );
    }

    override set( item: OptionalModel<EntradaBienConsumoValorSalida> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaBienConsumoValorSalida> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation();

        context.execute( this, EntradaBienConsumoValorSalida.type, () => {
            this.salida?.setRelation( context );
        } );

        return this;
    }


    override procesarInformacion(): this {
        if ( this.salida !== undefined ) {

            try {
                this.set( {
                    importeValorUnitario: this.salida.importeCostoUnitario,
                } )
            }
            catch ( error ) {
                this.set( {
                    importeValorUnitario: 0,
                } );
            }
        }

        super.procesarInformacion();

        return this;
    }
}