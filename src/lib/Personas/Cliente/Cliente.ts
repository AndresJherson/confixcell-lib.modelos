import { Persona, Prop } from '../../../index';

@Prop.Class()
export class Cliente extends Persona
{
    static override type = 'Cliente';
    override type: string = Cliente.type;


    constructor( json?: Partial<Cliente> )
    {
        super();
        Prop.initialize( this, json );
    }


    static override initialize( data: Partial<Cliente>[] ): Cliente[]
    {
        return data.map( item => new ( Prop.GetClass<Cliente>( item ) ?? Cliente ) ( item ) )
    }
}