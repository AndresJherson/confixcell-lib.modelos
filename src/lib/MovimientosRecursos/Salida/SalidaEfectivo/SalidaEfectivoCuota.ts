import { Cuota, Prop, PropBehavior, SalidaEfectivoCredito } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoCuota extends Cuota {
    
    static override type: string = 'SalidaEfectivoCuota';
    override type: string = SalidaEfectivoCuota.type;

    @Prop.Set( PropBehavior.model, x => new SalidaEfectivoCredito( x ) ) credito?: SalidaEfectivoCredito;


    constructor( item?: Partial<SalidaEfectivoCuota> ) {
        super()
        Prop.initialize( this, item );
    }
}