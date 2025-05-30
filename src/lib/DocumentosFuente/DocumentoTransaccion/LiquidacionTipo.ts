import { Model, Prop } from '../../../index';

@Prop.Class()
export class LiquidacionTipo extends Model
{
    static override type: string = 'LiquidacionTipo';
    override type: string = LiquidacionTipo.type;
    
    @Prop.Set() nombre?: string;
    

    constructor( item?: Partial<LiquidacionTipo> )
    {
        super();
        Prop.initialize( this, item );
    }
}