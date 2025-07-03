import { MedioTransferencia, Prop, PropBehavior, SalidaEfectivo } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoContado extends SalidaEfectivo {
    static override type: string = 'SalidaEfectivoContado';
    override type: string = SalidaEfectivoContado.type;

    @Prop.Set( PropBehavior.model, x => new MedioTransferencia( x ) ) medioTransferencia?: MedioTransferencia;


    constructor( item?: Partial<SalidaEfectivoContado> ) {
        super()
        Prop.initialize( this, item );
    }

    override set( item: Partial<SalidaEfectivoContado> ): this {
        return super.set( item as Partial<this> );
    }
}