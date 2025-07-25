import { DateTime } from 'luxon';
import { Cast, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class Usuario extends Model {

    static override type: string = ModelType.Usuario;
    override type: string = ModelType.Usuario;

    @Prop.Set() correo?: string | null;
    @Prop.Set() contrasena?: string | null;
    @Prop.Set() nombre?: string | null;
    @Prop.Set() esActivo?: boolean | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string | null;

    get dateTimeCreacion(): DateTime { return Cast.toDateTime( this.fechaCreacion ); }
    get dateTimeActualizacion(): DateTime { return Cast.toDateTime( this.fechaActualizacion ); }


    constructor( item?: OptionalModel<Usuario> ) {
        super();
        Prop.initialize( this, item );
    }


    crear() {
        this.fechaCreacion = DateTime.local().toSQL();
        this.fechaActualizacion = DateTime.local().toSQL();
        return this;
    }


    actualizar() {
        this.fechaActualizacion = DateTime.local().toSQL();
        return this;
    }


    override set( item: OptionalModel<Usuario> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Usuario> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<Usuario>[] ): Array<Usuario | null> {
        return Prop.arrayInitialize( Usuario, data );
    }
}