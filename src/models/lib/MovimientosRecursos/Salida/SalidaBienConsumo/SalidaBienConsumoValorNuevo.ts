import { OptionalModel, Prop, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumoValorNuevo extends SalidaBienConsumo {

    static override type = 'SalidaBienConsumoValorNuevo';
    override type = 'SalidaBienConsumoValorNuevo';
    private __SalidaBienConsumoValorNuevo!: 'SalidaBienConsumoValorNuevo';


    constructor( item?: OptionalModel<SalidaBienConsumoValorNuevo> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaBienConsumoValorNuevo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaBienConsumoValorNuevo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override procesarInformacion(): this {
        try {
            this.set( {
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.decimalCantidadSaliente )
                    .toNumber()
            } )
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