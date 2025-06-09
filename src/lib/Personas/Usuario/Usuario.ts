import { DateTime } from 'luxon';
import { Model, Persona, Prop, PropBehavior } from '../../../index';

@Prop.Class()
export class Usuario extends Model
{
    static override type: string = 'Usuario';
    override type: string = Usuario.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() usuario?: string;
    @Prop.Set() contrasena?: string;
    @Prop.Set() esActivo?: boolean;
    @Prop.Set( PropBehavior.model, x => new Persona( x ) ) persona?: Persona;

    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;
    
    get dateTimeCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }


    constructor( item?: Partial<Usuario> )
    {
        super();
        Prop.initialize( this, item );
    }


    crear()
    {
        this.fechaCreacion = Prop.toDateTimeNow().toSQL();
        this.fechaActualizacion = Prop.toDateTimeNow().toSQL();
        return this;
    }


    actualizar()
    {
        this.fechaActualizacion = Prop.toDateTimeNow().toSQL();
        return this;
    }
}