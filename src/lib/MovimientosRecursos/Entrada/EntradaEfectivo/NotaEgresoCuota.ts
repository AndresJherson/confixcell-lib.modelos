import { Cuota, ModelType, NotaEgresoCredito, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaEgresoCuota extends Cuota {

    static override type = ModelType.NotaEgresoCuota;
    override type = ModelType.NotaEgresoCuota;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaEgresoCredito( x ) } ) declare credito?: NotaEgresoCredito | null;


    constructor( item?: OptionalModel<NotaEgresoCuota> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaEgresoCuota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaEgresoCuota> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}