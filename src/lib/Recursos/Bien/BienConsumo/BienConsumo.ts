import { Bien, Prop } from '../../../../index';

@Prop.Class()
export class BienConsumo extends Bien
{
    static override type = 'BienConsumo';
    override type: string = BienConsumo.type;
    

    constructor( item?: Partial<BienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<BienConsumo>[] ): BienConsumo[]
    {
        return data.map( item => new ( Prop.GetClass<BienConsumo>( item ) ?? BienConsumo ) ( item ) )
    }
}