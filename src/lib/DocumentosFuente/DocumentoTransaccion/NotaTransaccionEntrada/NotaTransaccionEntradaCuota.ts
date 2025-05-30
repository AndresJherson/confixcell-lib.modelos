import { Cuota, NotaTransaccionEntradaCredito, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaTransaccionEntradaCuota extends Cuota
{
    static override type: string = 'NotaTransaccionEntradaCuota';
    override type = NotaTransaccionEntradaCuota.type;

    @Prop.Set( PropBehavior.model, x => new NotaTransaccionEntradaCredito( x ) ) credito?: NotaTransaccionEntradaCredito;


    constructor( item?: Partial<NotaTransaccionEntradaCuota> )
    {
        super();
        Prop.initialize( this, item );
    }
}