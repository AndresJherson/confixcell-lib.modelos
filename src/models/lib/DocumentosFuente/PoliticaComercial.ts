import { Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class PoliticaComercial extends Model {

    static override type = 'PoliticaComercial';
    override type = 'PoliticaComercial';
    private __PoliticaComercial!: 'PoliticaComercial';

    @Prop.Set() numero?: number | null;
    @Prop.Set() descripcion?: string | null;
    @Prop.Set() esActivo?: boolean | null;


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