import { Cuota, NotaIngresoCredito, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaIngresoCuota extends Cuota
{
    static override type: string = 'NotaIngresoCuota';
    override type = NotaIngresoCuota.type;

    @Prop.Set( PropBehavior.model, x => new NotaIngresoCredito( x ) ) credito?: NotaIngresoCredito;


    constructor( item?: Partial<NotaIngresoCuota> )
    {
        super();
        Prop.initialize( this, item );
    }
}