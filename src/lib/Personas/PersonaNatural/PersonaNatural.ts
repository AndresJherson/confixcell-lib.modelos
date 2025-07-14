import { ExecutionContext, Genero, ModelType, OptionalModel, Persona, Prop, PropBehavior } from "../../../index";

@Prop.Class()
export class PersonaNatural extends Persona {

    static override type = ModelType.PersonaNatural;
    override type = ModelType.PersonaNatural;

    @Prop.Set() nombre?: string | null;
    @Prop.Set() apellido?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Genero( x ) } ) genero?: Genero | null;
    @Prop.Set() domicilio?: string | null;
    @Prop.Set() celular?: number | null;
    @Prop.Set() celularRespaldo?: number | null;

    override get nombreCompleto() {
        const nombreCompleto = `${this.nombre ?? ''} ${this.apellido ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: OptionalModel<PersonaNatural> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<PersonaNatural> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PersonaNatural> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, PersonaNatural.type, () => {
            this.genero?.setRelation( context );
        } );

        return this;
    }
}