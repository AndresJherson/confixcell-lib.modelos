import { ExecutionContext, MedioTransferencia, ModelType, OptionalModel, Prop, PropBehavior, SalidaEfectivo } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoContado extends SalidaEfectivo {

    static override type = ModelType.SalidaEfectivoContado;
    override type = ModelType.SalidaEfectivoContado;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new MedioTransferencia( x ) } ) medioTransferencia?: MedioTransferencia;


    constructor( item?: OptionalModel<SalidaEfectivoContado> ) {
        super()
        Prop.initialize( this, item );
    }

    override set( item: OptionalModel<SalidaEfectivoContado> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaEfectivoContado> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaEfectivoContado.type, () => {
            this.medioTransferencia?.setRelation( context );
        } );

        return this;
    }
}