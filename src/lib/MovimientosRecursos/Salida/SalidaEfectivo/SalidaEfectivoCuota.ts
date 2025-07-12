import { Cuota, ModelType, OptionalModel, Prop, PropBehavior, SalidaEfectivoCredito } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoCuota extends Cuota {

    static override type = ModelType.SalidaEfectivoCuota;
    override type = ModelType.SalidaEfectivoCuota;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaEfectivoCredito( x ) } ) override credito?: SalidaEfectivoCredito;


    constructor( item?: OptionalModel<SalidaEfectivoCuota> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaEfectivoCuota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaEfectivoCuota> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}