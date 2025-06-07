import { DateTime } from 'luxon';
import { KardexBienConsumo, Model, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class EventoPendienteKardexBienConsumo extends Model
{
    static override type: string = 'EventoPendienteKardexBienConsumo';
    override type: string = EventoPendienteKardexBienConsumo.type;

    @Prop.Set( PropBehavior.model, x => new KardexBienConsumo( x ) ) kardex?: KardexBienConsumo;
    @Prop.Set() evento?: string;
    @Prop.Set( PropBehavior.object ) data?: Record<any, any>;

    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }


    constructor( item?: Partial<EventoPendienteKardexBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }
}