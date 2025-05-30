import { Model, Prop } from '../../index';

@Prop.Class()
export class DbPreset extends Model
{
    static override type: string = 'DbPreset';
    override type: string = DbPreset.type;
    
    @Prop.Set() titulo?: string;
    @Prop.Set() target?: string;
    @Prop.Set() valor?: string;
    

    constructor( item?: Partial<DbPreset> )
    {
        super();
        Prop.initialize( this, item );
    }
}