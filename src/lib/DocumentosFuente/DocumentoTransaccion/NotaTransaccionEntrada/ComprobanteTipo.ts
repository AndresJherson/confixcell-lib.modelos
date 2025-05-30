import { Model, Prop } from '../../../../index';

@Prop.Class()
export class ComprobanteTipo extends Model
{
    static override type: string = 'ComprobanteTipo';
    override type: string = ComprobanteTipo.type;
    
    @Prop.Set() nombre?: string;
    

    constructor( item?: Partial<ComprobanteTipo> )
    {
        super();
        Prop.initialize( this, item );
    }
}