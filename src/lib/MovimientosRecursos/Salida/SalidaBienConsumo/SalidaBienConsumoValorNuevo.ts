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
}