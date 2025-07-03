import { Cuota, NotaEgresoCredito, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaEgresoCuota extends Cuota
{
    static override type: string = 'NotaEgresoCuota';
    override type = NotaEgresoCuota.type;

    @Prop.Set( PropBehavior.model, x => new NotaEgresoCredito( x ) ) credito?: NotaEgresoCredito;


    constructor( item?: Partial<NotaEgresoCuota> )
    {
        super();
        Prop.initialize( this, item );
    }
}