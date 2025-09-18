import { ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SuperUsuario } from '../../../index';

@Prop.Class()
export class SuperUsuarioEmpresa extends Model {

    static override type = 'SuperUsuarioEmpresa';
    override type = 'SuperUsuarioEmpresa';
    private __SuperUsuarioEmpresa!: 'SuperUsuarioEmpresa';

    @Prop.Set() razonSocial?: string | null;
    @Prop.Set() ruc?: string | null;
    @Prop.Set() celular?: number | null;
    @Prop.Set() domicilio?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SuperUsuario( x ) } ) superUsuario?: SuperUsuario | null;


    constructor( item?: OptionalModel<SuperUsuarioEmpresa> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SuperUsuarioEmpresa> ): this {
        return super.set( item as OptionalModel<this> );
    }

    override assign( item: OptionalModel<SuperUsuarioEmpresa> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SuperUsuarioEmpresa.type, () => {

            this.superUsuario?.assign( {
                empresa: this
            } ).setRelation( context )

        } );

        return this;
    }
}