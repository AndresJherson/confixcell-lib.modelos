import { Cuota, NotaTransaccionSalidaCredito, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaTransaccionSalidaCuota extends Cuota
{
    static override type: string = 'NotaTransaccionSalidaCuota';
    override type = NotaTransaccionSalidaCuota.type;

    @Prop.Set( PropBehavior.model, x => new NotaTransaccionSalidaCredito( x ) ) credito?: NotaTransaccionSalidaCredito;


    constructor( item?: Partial<NotaTransaccionSalidaCuota> )
    {
        super();
        Prop.initialize( this, item );
    }
}