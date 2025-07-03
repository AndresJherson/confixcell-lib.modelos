import { Prop, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumoValorNuevo extends SalidaBienConsumo {
    static override type: string = 'SalidaBienConsumoValorNuevo';
    override type: string = SalidaBienConsumoValorNuevo.type;


    constructor( item?: Partial<SalidaBienConsumoValorNuevo> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<SalidaBienConsumoValorNuevo> ): this {
        return super.set( item as Partial<this> );
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