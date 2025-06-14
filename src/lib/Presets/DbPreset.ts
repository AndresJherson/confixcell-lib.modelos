import { Model, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class DbPreset extends Model
{
    static override type: string = 'DbPreset';
    override type: string = DbPreset.type;
    
    @Prop.Set() titulo?: string;
    @Prop.Set() target?: string;
    @Prop.Set() targetType?: string;
    @Prop.Set() targetJson?: Record<string,any>;
    @Prop.Set() valor?: string;
    

    constructor( item?: Partial<DbPreset> )
    {
        super();
        Prop.initialize( this, item );
    }
}