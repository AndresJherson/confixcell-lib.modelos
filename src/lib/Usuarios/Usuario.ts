import { DateTime } from 'luxon';
import { Model, ModelType, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class Usuario extends Model {

    static override type: string = ModelType.Usuario;
    override type: string = ModelType.Usuario;

    @Prop.Set() correo?: string;
    @Prop.Set() contrasena?: string;
    @Prop.Set() nombre?: string;
    @Prop.Set() esActivo?: boolean;

    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;

    get dateTimeCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }


    constructor( item?: Partial<Usuario> ) {
        super();
        Prop.initialize( this, item );
    }


    crear() {
        this.fechaCreacion = Prop.toDateTimeNow().toSQL();
        this.fechaActualizacion = Prop.toDateTimeNow().toSQL();
        return this;
    }


    actualizar() {
        this.fechaActualizacion = Prop.toDateTimeNow().toSQL();
        return this;
    }


    override set( item: Partial<Usuario> ): this {
        return super.set( item as Partial<this> );
    }


    static initialize( data: Partial<Usuario>[] ): Usuario[] {
        return data.map( item => new ( Prop.GetClass<Usuario>( item ) ?? Usuario )( item ) )
    }
}