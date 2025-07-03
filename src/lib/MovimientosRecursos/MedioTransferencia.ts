import { Model, ModelType, Prop } from "../../index";

@Prop.Class()
export class MedioTransferencia extends Model {

    static override type = ModelType.MedioTransferencia;
    override type = ModelType.MedioTransferencia;

    @Prop.Set() nombre?: string;


    constructor( item?: Partial<MedioTransferencia> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<MedioTransferencia> ): this {
        return super.set( item as Partial<this> );
    }
}