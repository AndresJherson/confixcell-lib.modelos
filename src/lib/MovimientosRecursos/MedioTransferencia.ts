import { Model, ModelType, OptionalModel, Prop } from "../../index";

@Prop.Class()
export class MedioTransferencia extends Model {

    static override type = ModelType.MedioTransferencia;
    override type = ModelType.MedioTransferencia;

    @Prop.Set() nombre?: string | null;


    constructor( item?: OptionalModel<MedioTransferencia> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<MedioTransferencia> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<MedioTransferencia> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}