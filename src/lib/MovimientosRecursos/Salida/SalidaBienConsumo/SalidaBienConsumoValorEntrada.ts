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

            try {
                this.set({
                    almacen: this.entrada.almacen,
                    importeCostoUnitario: this.entrada.importeCostoUnitario
                })
            }
            catch ( error ) {
                this.set({
                    importePrecioNeto: 0
                });
            }
        }

        try {
            this.set({
                importePrecioNeto: this.decimalImportePrecioUnitario
                    .mul( this.cantidadSaliente )
                    .toNumber()
            });
        }
        catch ( error ) {
            this.set({
                importePrecioNeto: 0
            });
        }

        super.procesarInformacion();

        return this;
    }
}