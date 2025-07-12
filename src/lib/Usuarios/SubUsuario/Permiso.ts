import { ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, Rol } from '../../../index';

@Prop.Class()
export class Permiso extends Model {

    static override type: string = ModelType.Permiso;
    override type: string = ModelType.Permiso;

    @Prop.Set() nombre?: string;
    @Prop.Set() descripcion?: string;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Rol( x ) } ) rol?: Rol;


    constructor( item?: OptionalModel<Permiso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Permiso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Permiso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, Permiso.type, () => {
            this.rol?.setRelation( context );
        } )

        return this;
    }
}