import { ModelType, Persona, Prop, PropBehavior, SuperUsuario, Usuario } from '../../../index';

@Prop.Class()
export class SubUsuario extends Usuario {

    static override type: string = ModelType.SubUsuario;
    override type: string = ModelType.SubUsuario;

    @Prop.Set( PropBehavior.model, x => new Persona( x ) ) persona?: Persona;
    @Prop.Set( PropBehavior.model, x => new SuperUsuario( x ) ) superUsuario?: SuperUsuario;


    constructor( item?: Partial<SubUsuario> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<SubUsuario> ): this {
        return super.set( item as Partial<this> );
    }
}