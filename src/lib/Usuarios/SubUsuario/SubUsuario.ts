import { ExecutionContext, Model, ModelType, OptionalModel, Persona, Prop, PropBehavior, Rol, SuperUsuario, Usuario } from '../../../index';

@Prop.Class()
export class SubUsuario extends Usuario {

    static override type: string = ModelType.SubUsuario;
    override type: string = ModelType.SubUsuario;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Persona.initialize( [x] )[0] } ) persona?: Persona;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Usuario.initialize( [x] )[0] } ) creadoPor?: Usuario;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SuperUsuario( x ) } ) superUsuario?: SuperUsuario;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new Rol( x ) } ) roles?: Rol[];


    constructor( item?: OptionalModel<SubUsuario> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SubUsuario> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SubUsuario> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SubUsuario.type, () => {

            this.persona?.assign( {
                subUsuario: this
            } ).setRelation( context )

            this.creadoPor?.setRelation( context );

            this.superUsuario?.setRelation( context );

            this.roles?.forEach( rol => rol.assign( {
                subUsuario: this
            } ).setRelation( context ) )

        } )

        return this;
    }


    agregarRol( rol: Rol ): this {
        this.roles ??= [];
        this.roles.push( rol );
        return this;
    }


    actualizarRol( rol: Rol ): this {
        if ( this.roles ) {
            const i = this.roles.findIndex( x => x.isSameIdentity( rol ) );

            if ( i !== -1 ) {
                this.roles[i] = rol;
            }
        }

        return this;
    }


    eliminarRol( rol: Rol ): this {
        this.roles = this.roles?.filter( x => !x.isSameIdentity( rol ) );
        return this;
    }


    getRol( rol: Rol ): Rol | undefined {
        if ( !this.roles ) return undefined;
        const i = this.roles.findIndex( x => x.isSameIdentity( rol ) );
        return this.roles[i];
    }
}