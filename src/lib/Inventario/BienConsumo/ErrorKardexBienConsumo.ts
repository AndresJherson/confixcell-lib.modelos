import { DateTime } from 'luxon';
import { KardexBienConsumo, Model, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class ErrorKardexBienConsumo extends Model
{
    static override type: string = 'ErrorKardexBienConsumo';
    override type: string = ErrorKardexBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new KardexBienConsumo( x ) ) kardex?: KardexBienConsumo;
    @Prop.Set() mensaje?: string;
    
    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }
    

    constructor( item?: Partial<ErrorKardexBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}