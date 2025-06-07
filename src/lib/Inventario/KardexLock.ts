import { DateTime } from 'luxon';
import { Model, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class KardexLock extends Model
{
    static override type: string = 'KardexLock';
    override type: string = KardexLock.type;
    
    @Prop.Set() clave?: string;
    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    
    get dataTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }


    constructor( item?: Partial<KardexLock> )
    {
        super();
        Prop.initialize( this, item );
    }
}