import { ModelType, OptionalModel, Persona, Prop } from "../../../index";

@Prop.Class()
export class PersonaJuridica extends Persona {

    static override type = ModelType.PersonaJuridica;
    override type = ModelType.PersonaJuridica;

    @Prop.Set() nombre?: string | null;
    @Prop.Set() domicilio?: string | null;
    @Prop.Set() celular?: number | null;

    override get nombreCompleto() {
        return this.nombre;
    }


    constructor( json?: OptionalModel<PersonaJuridica> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<PersonaJuridica> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PersonaJuridica> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}