import { EntradaBienConsumo, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumoValorSalida extends EntradaBienConsumo {
    static override type: string = 'EntradaBienConsumoValorSalida';
    override type: string = EntradaBienConsumoValorSalida.type;

    @Prop.Set( PropBehavior.model, x => new SalidaBienConsumo( x ) ) salida?: SalidaBienConsumo;


    constructor( item?: Partial<EntradaBienConsumoValorSalida> ) {
        super()
        Prop.initialize( this, item );
    }

    override set( item: Partial<EntradaBienConsumoValorSalida> ): this {
        return super.set( item as Partial<this> );
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