import { Genero, Persona, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class PersonaNatural extends Persona
{
    static override type = 'PersonaNatural';
    override type: string = PersonaNatural.type;

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


    constructor( json?: Partial<PersonaNatural> )
    {
        super();
        Prop.initialize( this, json );
    }
}