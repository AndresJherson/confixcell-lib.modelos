import { EntradaBienConsumo, Prop } from '../../../../index';

@Prop.Class()
export class EntradaBienConsumoValorNuevo extends EntradaBienConsumo
{
    static override type: string = 'EntradaBienConsumoValorNuevo';
    override type: string = EntradaBienConsumoValorNuevo.type;


    constructor( item?: Partial<EntradaBienConsumoValorNuevo> )
    {
        super()
        Prop.initialize( this, item );
    }
}