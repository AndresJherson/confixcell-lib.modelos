import { KardexBienConsumo, Model, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class InventarioBienConsumo extends Model
{
    static override type = 'InventarioBienConsumo';
    override type: string = InventarioBienConsumo.type;
    
    @Prop.Set( PropBehavior.array, x => new KardexBienConsumo( x ) ) kardexs: KardexBienConsumo[] = [];


    constructor( item?: Partial<InventarioBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}