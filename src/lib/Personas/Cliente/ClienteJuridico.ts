import { Cliente, Prop } from "../../../index";

@Prop.Class()
export class ClienteJuridico extends Cliente
{
    static override type = 'ClienteJuridico';
    override type: string = ClienteJuridico.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() domicilio?: string;
    @Prop.Set() celular?: number;

    override get nombreCompleto() {
        return this.nombre;
    }

    constructor( json?: Partial<ClienteJuridico> )
    {
        super();
        Prop.initialize( this, json );
    }
}