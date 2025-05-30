import { Model, Prop } from '../../../index';

@Prop.Class()
export class Empresa extends Model
{
    static override type = 'Empresa';
    override type: string = Empresa.type;

    @Prop.Set() ruc?: string;
    @Prop.Set() razonSocial?: string;
    @Prop.Set() celular?: number;
    @Prop.Set() domicilio?: string;

    
    constructor( item?: Partial<Empresa> )
    {
        super();
        Prop.initialize( this, item );
    }
}