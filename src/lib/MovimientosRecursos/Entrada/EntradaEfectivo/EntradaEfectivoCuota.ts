import { Cuota, EntradaEfectivoCredito, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoCuota extends Cuota
{
    static override type: string = 'EntradaEfectivoCuota';
    override type: string = EntradaEfectivoCuota.type;

    @Prop.Set( PropBehavior.model, x => new EntradaEfectivoCredito( x ) ) credito?: EntradaEfectivoCredito;


    constructor( item?: Partial<EntradaEfectivoCuota> )
    {
        super()
        Prop.initialize( this, item );
    }
}