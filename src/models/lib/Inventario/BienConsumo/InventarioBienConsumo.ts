import { ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class InventarioBienConsumo extends Model {

    static override type = 'InventarioBienConsumo';
    override type = 'InventarioBienConsumo';
    private __InventarioBienConsumo!: 'InventarioBienConsumo';

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new KardexBienConsumo( x ) } ) kardexs?: KardexBienConsumo[] | null;


    constructor( item?: OptionalModel<InventarioBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<InventarioBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<InventarioBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, InventarioBienConsumo.type, () => {

            this.kardexs?.forEach( item => item.assign( {
                inventario: this
            } ).setRelation( context ) );

        } );

        return this;
    }
}