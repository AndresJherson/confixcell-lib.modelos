import { DateTime } from 'luxon';
import { EntradaEfectivo, MedioTransferencia, NotaVenta, Prop, PropBehavior } from '../../../../../index';

@Prop.Class()
export class NotaVentaEntradaEfectivo extends EntradaEfectivo
{
    static override type: string = 'NotaVentaEntradaEfectivo';
    override type: string = NotaVentaEntradaEfectivo.type;

    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set() numero: number = 0;
    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    @Prop.Set( PropBehavior.model, x => new MedioTransferencia( x ) ) medioTransferencia?: MedioTransferencia;

    get dateTimeFecha(): DateTime
    {
        return Prop.toDateTime( this.fecha );
    }

    
    constructor( item?: Partial<NotaVentaEntradaEfectivo> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaVentaEntradaEfectivo>): this 
    {
        return super.set( item as Partial<this> );
    }
}