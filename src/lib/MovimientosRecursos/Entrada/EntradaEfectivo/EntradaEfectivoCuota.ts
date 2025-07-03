import { Cuota, EntradaEfectivoCredito, ModelType, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoCuota extends Cuota {
    static override type = ModelType.EntradaEfectivoCuota;
    override type = ModelType.EntradaEfectivoCuota;

    @Prop.Set( PropBehavior.model, x => new EntradaEfectivoCredito( x ) ) credito?: EntradaEfectivoCredito;


    constructor( item?: Partial<EntradaEfectivoCuota> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<EntradaEfectivoCuota> ): this {
        return super.set( item as Partial<this> );
    }
}