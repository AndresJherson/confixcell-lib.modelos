import { Model, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class PoliticaComercial extends Model
{
    static override type = 'PoliticaComercial';
    override type: string = PoliticaComercial.type;

    @Prop.Set() descripcion?: string;
    @Prop.Set() esActivo?: boolean;

    
    constructor( item?: Partial<PoliticaComercial> )
    {
        super();
        Prop.initialize( this, item );
    }
}