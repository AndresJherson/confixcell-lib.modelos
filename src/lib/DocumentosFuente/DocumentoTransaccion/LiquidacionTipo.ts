import { Model, ModelType, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class LiquidacionTipo extends Model {

    static override type = ModelType.LiquidacionTipo;
    override type = ModelType.LiquidacionTipo;

    @Prop.Set() nombre?: string;


    constructor( item?: Partial<LiquidacionTipo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<LiquidacionTipo> ): this {
        return super.set( item as Partial<this> );
    }


    override assign( item: OptionalModel<LiquidacionTipo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}