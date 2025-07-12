import { Model, ModelType, OptionalModel, Prop } from '../../index';

@Prop.Class()
export class DbPreset extends Model {
    
    static override type: string = ModelType.DbPreset;
    override type: string = DbPreset.type;

    @Prop.Set() titulo?: string;
    @Prop.Set() target?: string;
    @Prop.Set() dataType?: string;
    @Prop.Set() valor?: string;
    @Prop.Set() esActualizable?: boolean;


    constructor( item?: OptionalModel<DbPreset> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DbPreset> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DbPreset> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}