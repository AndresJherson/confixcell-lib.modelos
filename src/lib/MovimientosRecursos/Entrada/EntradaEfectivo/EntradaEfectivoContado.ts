import { EntradaEfectivo, MedioTransferencia, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoContado extends EntradaEfectivo
{
    static override type: string = 'EntradaEfectivoContado';
    override type: string = EntradaEfectivoContado.type;

    @Prop.Set( PropBehavior.model, x => new MedioTransferencia( x ) ) medioTransferencia?: MedioTransferencia;
    

    constructor( item?: Partial<EntradaEfectivoContado> )
    {
        super()
        Prop.initialize( this, item );
    }
}