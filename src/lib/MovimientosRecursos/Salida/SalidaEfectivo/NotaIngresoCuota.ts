import { Cuota, ModelType, NotaIngresoCredito, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaIngresoCuota extends Cuota {

    static override type: string = ModelType.NotaIngresoCuota;
    override type: string = ModelType.NotaIngresoCuota;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaIngresoCredito( x ) } ) override credito?: NotaIngresoCredito | null;


    constructor( item?: OptionalModel<NotaIngresoCuota> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaIngresoCuota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaIngresoCuota> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}