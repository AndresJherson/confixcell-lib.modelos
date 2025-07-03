import { ModelType, Persona, Prop } from "../../../index";

@Prop.Class()
export class PersonaJuridica extends Persona {

    static override type = ModelType.PersonaJuridica;
    override type = ModelType.PersonaJuridica;

    @Prop.Set() nombre?: string;
    @Prop.Set() domicilio?: string;
    @Prop.Set() celular?: number;

    override get nombreCompleto() {
        return this.nombre;
    }


    constructor( json?: Partial<PersonaJuridica> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<PersonaJuridica> ): this {
        return super.set( item as Partial<this> );
    }
}