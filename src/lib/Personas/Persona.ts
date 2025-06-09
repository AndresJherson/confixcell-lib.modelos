import { DateTime } from 'luxon';
import { DocumentoIdentificacion, Model, Prop, PropBehavior, Usuario } from '../../index';

@Prop.Class()
export class Persona extends Model
{
    static override type = 'Persona';
    override type: string = Persona.type;

    @Prop.Set( PropBehavior.model, x => new DocumentoIdentificacion( x ) ) documentoIdentificacion?: DocumentoIdentificacion;
    @Prop.Set() codigo?: string;
    @Prop.Set( PropBehavior.model, x => new Usuario( x ) ) usuario?: Usuario;
    
    get nombreCompleto(): string | undefined {
        return undefined;
    }

    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;
    
    get dateTimeCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }


    constructor( item?: Partial<Persona> )
    {
        super();
        Prop.initialize( this, item );
    }


    static initialize(data: Partial<Persona>[]): Persona[] 
    {
        return data.map( item => new ( Prop.GetClass<Persona>( item ) ?? Persona ) ( item ) )
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