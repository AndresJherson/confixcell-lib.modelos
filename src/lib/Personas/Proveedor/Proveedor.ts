import { Persona, Prop } from '../../../index';

@Prop.Class()
export class Proveedor extends Persona
{
    static override type = 'Proveedor';
    override type: string = Proveedor.type;

    constructor( item?: Partial<Proveedor> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<Proveedor>[] ): Proveedor[]
    {
        return data.map( item => new ( Prop.GetClass<Proveedor>( item ) ?? Proveedor ) ( item ) )
    }
}