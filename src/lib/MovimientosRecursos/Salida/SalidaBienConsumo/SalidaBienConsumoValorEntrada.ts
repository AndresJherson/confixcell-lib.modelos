import { EntradaBienConsumo, Prop, PropBehavior, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumoValorEntrada extends SalidaBienConsumo
{
    static override type: string = 'SalidaBienConsumoValorEntrada';
    override type: string = SalidaBienConsumoValorEntrada.type;

    @Prop.Set( PropBehavior.model, x => new EntradaBienConsumo( x ) ) entrada?: EntradaBienConsumo;


    constructor( item?: Partial<SalidaBienConsumoValorEntrada> )
    {
        super()
        Prop.initialize( this, item );
    }
    

    override set(item: Partial<SalidaBienConsumoValorEntrada>): this 
    {
        return super.set( item as Partial<this> );
    }


    override procesarInformacion(): this 
    {
        if ( this.entrada !== undefined ) {

            if ( this.entrada.cantidadDisponible <= 0 ) throw new Error('No hay cantidad disponible');

            try {
                this.set({
                    importeValorUnitario: this.entrada.importeValorUnitario,
                })
            }
            catch ( error ) {
                this.set({
                    importeValorUnitario: 0,
                });
            }
        }

        super.procesarInformacion();

        return this;
    }
}