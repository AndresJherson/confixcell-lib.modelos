import { Model, ModelType, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class LiquidacionTipo extends Model {

    static override type = ModelType.LiquidacionTipo;
    override type = ModelType.LiquidacionTipo;

    @Prop.Set() nombre?: string | null;


    constructor( item?: OptionalModel<LiquidacionTipo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<LiquidacionTipo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<LiquidacionTipo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}