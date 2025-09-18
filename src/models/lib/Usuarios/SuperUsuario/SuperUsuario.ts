import { ExecutionContext, ModelType, OptionalModel, Preset, Prop, PropBehavior, SubUsuario, SuperUsuarioEmpresa, Usuario } from '../../../index';

@Prop.Class()
export class SuperUsuario extends Usuario {

    static override type = 'SuperUsuario';
    override type = 'SuperUsuario';
    private __SuperUsuario!: 'SuperUsuario';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SuperUsuarioEmpresa( x ) } ) empresa?: SuperUsuarioEmpresa | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Preset( x ) } ) preset?: Preset | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SubUsuario( x ) } ) subUsuarios?: SubUsuario[] | null;


    constructor( item?: OptionalModel<SuperUsuario> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SuperUsuario> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SuperUsuario> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SuperUsuario.type, () => {

            this.empresa?.assign( {
                superUsuario: this
            } ).setRelation( context )

            this.preset?.assign( {
                superUsuario: this
            } ).setRelation( context );

            this.subUsuarios?.forEach( subUsuario => subUsuario.assign( {
                superUsuario: this
            } ).setRelation( context ) )

        } )

        return this;
    }
}