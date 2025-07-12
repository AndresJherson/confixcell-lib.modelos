import { Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class PoliticaComercial extends Model {

    static override type = ModelType.PoliticaComercial;
    override type: string = ModelType.PoliticaComercial;

    @Prop.Set() descripcion?: string;
    @Prop.Set() esActivo?: boolean;


    constructor( item?: OptionalModel<PoliticaComercial> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<PoliticaComercial> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PoliticaComercial> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}