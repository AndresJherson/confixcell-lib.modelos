import { EntradaEfectivo, ExecutionContext, MedioTransferencia, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoContado extends EntradaEfectivo {

    static override type: string = ModelType.EntradaEfectivoContado;
    override type = ModelType.EntradaEfectivoContado;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new MedioTransferencia( x ) } ) medioTransferencia?: MedioTransferencia;


    constructor( item?: OptionalModel<EntradaEfectivoContado> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaEfectivoContado> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaEfectivoContado> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, EntradaEfectivoContado.type, () => {
            this.medioTransferencia?.setRelation( context );
        } );

        return this;
    }
}