import { Cuota, EntradaEfectivoCredito, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoCuota extends Cuota {

    static override type = 'EntradaEfectivoCuota';
    override type = 'EntradaEfectivoCuota';
    private __EntradaEfectivoCuota!: 'EntradaEfectivoCuota';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new EntradaEfectivoCredito( x ) } ) declare credito?: EntradaEfectivoCredito | null;


    constructor( item?: OptionalModel<EntradaEfectivoCuota> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaEfectivoCuota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaEfectivoCuota> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}