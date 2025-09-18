import { ExecutionContext, Model, ModelType, OptionalModel, Permiso, Prop, PropBehavior, SubUsuario } from '../../../index';

@Prop.Class()
export class Rol extends Model {

    static override type = 'Rol';
    override type = 'Rol';
    private __Rol!: 'Rol';

    @Prop.Set() nombre?: string | null;
    @Prop.Set() descripcion?: string | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new Permiso( x ) } ) permisos?: Permiso[] | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SubUsuario( x ) } ) subUsuario?: SubUsuario | null;


    constructor( item?: OptionalModel<Rol> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Rol> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Rol> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, Rol.type, () => {

            this.permisos?.forEach( item => item.assign( {
                rol: this
            } ).setRelation( context ) );

            this.subUsuario?.setRelation( context );

        } );

        return this;
    }


    agregarPermiso( permiso: Permiso ): this {
        this.permisos ??= [];
        this.permisos.push( permiso );
        return this;
    }


    actualizarPermiso( permiso: Permiso ): this {
        if ( this.permisos ) {
            const i = this.permisos.findIndex( x => x.isSameIdentity( permiso ) );

            if ( i !== -1 ) {
                this.permisos[i] = permiso;
            }
        }

        return this;
    }


    eliminarPermiso( permiso: Permiso ): this {
        this.permisos = this.permisos?.filter( x => !x.isSameIdentity( permiso ) );
        return this;
    }


    getPermiso( permiso: Permiso ): Permiso | undefined {
        if ( !this.permisos ) return undefined;
        const i = this.permisos.findIndex( x => x.isSameIdentity( permiso ) );
        return this.permisos[i];
    }
}