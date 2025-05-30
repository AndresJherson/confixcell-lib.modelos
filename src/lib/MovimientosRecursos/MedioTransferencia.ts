import { Model, Prop } from "../../index";

@Prop.Class()
export class MedioTransferencia extends Model
{
    static override type = 'MedioTransferencia';
    override type: string = MedioTransferencia.type;

    @Prop.Set() nombre?: string;


    constructor( item?: Partial<MedioTransferencia> )
    {
        super();
        Prop.initialize( this, item );
    }
}