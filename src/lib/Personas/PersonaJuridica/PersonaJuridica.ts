import { Persona, Prop } from "../../../index";

@Prop.Class()
export class PersonaJuridica extends Persona
{
    static override type = 'PersonaJuridica';
    override type: string = PersonaJuridica.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() domicilio?: string;
    @Prop.Set() celular?: number;

    override get nombreCompleto() {
        return this.nombre;
    }

    constructor( json?: Partial<PersonaJuridica> )
    {
        super();
        Prop.initialize( this, json );
    }
}