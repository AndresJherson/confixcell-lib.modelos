import { Cliente, Genero, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class ClienteNatural extends Cliente
{
    static override type = 'ClienteNatural';
    override type: string = ClienteNatural.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() apellido?: string;
    @Prop.Set( PropBehavior.model, x => new Genero ( x ) ) genero?: Genero;
    @Prop.Set() domicilio?: string;
    @Prop.Set() celular?: number;
    @Prop.Set() celularRespaldo?: number;

    override get nombreCompleto() {
        const nombreCompleto = `${this.nombre ?? ''} ${this.apellido ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: Partial<ClienteNatural> )
    {
        super();
        Prop.initialize( this, json );
    }
}