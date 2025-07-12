import { Model, ModelType, OptionalModel, Prop } from '../../../../../index';

@Prop.Class()
export class ComprobanteTipo extends Model {

    static override type = ModelType.ComprobanteTipo;
    override type = ModelType.ComprobanteTipo;

    @Prop.Set() nombre?: string;


    constructor( item?: OptionalModel<ComprobanteTipo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<ComprobanteTipo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ComprobanteTipo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}