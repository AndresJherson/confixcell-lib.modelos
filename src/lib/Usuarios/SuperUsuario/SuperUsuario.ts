import { ModelType, Prop, Usuario } from '../../../index';

@Prop.Class()
export class SuperUsuario extends Usuario {
    
    static override type: string = ModelType.SuperUsuario;
    override type: string = ModelType.SuperUsuario;


    constructor( item?: Partial<SuperUsuario> ) {
        super();
        Prop.initialize( this, item );
    }

    
    override set( item: Partial<SuperUsuario> ): this {
        return super.set( item as Partial<this> );
    }
}