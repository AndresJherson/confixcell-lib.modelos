import { ModelType, Prop, PropBehavior, SuperUsuario, Usuario } from '../../../index';

@Prop.Class()
export class SuperUsuarioEmpresa extends Usuario {
    
    static override type: string = ModelType.SuperUsuarioEmpresa;
    override type: string = ModelType.SuperUsuarioEmpresa;

    @Prop.Set() razonSocial?: string;
    @Prop.Set() ruc?: string;
    @Prop.Set() celular?: number;
    @Prop.Set() domicilio?: string;
    @Prop.Set( PropBehavior.model, x => new SuperUsuario( x ) ) superUsuario?: SuperUsuario;


    constructor( item?: Partial<SuperUsuarioEmpresa> ) {
        super();
        Prop.initialize( this, item );
    }

    
    override set( item: Partial<SuperUsuarioEmpresa> ): this {
        return super.set( item as Partial<this> );
    }
}