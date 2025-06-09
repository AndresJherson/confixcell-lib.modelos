import { Prop, SalidaBienConsumo } from '../../../../index';

@Prop.Class()
export class SalidaBienConsumoValorNuevo extends SalidaBienConsumo
{
    static override type: string = 'SalidaBienConsumoValorNuevo';
    override type: string = SalidaBienConsumoValorNuevo.type;


    constructor( item?: Partial<SalidaBienConsumoValorNuevo> )
    {
        super()
        Prop.initialize( this, item );
    }


    override procesarInformacion(): this 
    {
        try {
            this.set({
                importePrecioNeto: this.decimalImportePrecioUnitario
                    .mul( this.cantidadSaliente ?? 0 )
                    .toNumber()
            })
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