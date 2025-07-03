import { EntradaEfectivo, MedioTransferencia, ModelType, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoContado extends EntradaEfectivo {

    static override type: string = ModelType.EntradaEfectivoContado;
    override type = ModelType.EntradaEfectivoContado;

    @Prop.Set( PropBehavior.model, x => new MedioTransferencia( x ) ) medioTransferencia?: MedioTransferencia;


    constructor( item?: Partial<EntradaEfectivoContado> ) {
        super()
        Prop.initialize( this, item );
    }

    override set( item: Partial<EntradaEfectivoContado> ): this {
        return super.set( item as Partial<this> );
    }
}