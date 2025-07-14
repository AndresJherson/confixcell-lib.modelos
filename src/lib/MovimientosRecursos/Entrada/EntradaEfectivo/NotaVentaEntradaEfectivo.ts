import { DateTime } from 'luxon';
import { Cast, EntradaEfectivo, ExecutionContext, MedioTransferencia, ModelType, NotaVenta, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaVentaEntradaEfectivo extends EntradaEfectivo {

    static override type = ModelType.NotaVentaEntradaEfectivo;
    override type = ModelType.NotaVentaEntradaEfectivo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVenta( x ) } ) override documentoFuente?: NotaVenta | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new MedioTransferencia( x ) } ) medioTransferencia?: MedioTransferencia | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }


    constructor( item?: OptionalModel<NotaVentaEntradaEfectivo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaEntradaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaEntradaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, NotaVentaEntradaEfectivo.type, () => {

            this.medioTransferencia?.setRelation( context );

        } );

        return this;
    }
}