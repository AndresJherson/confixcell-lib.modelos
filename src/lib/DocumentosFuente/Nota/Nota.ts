import { DateTime } from 'luxon';
import { DocumentoFuente, Model, Prop, PropBehavior, Usuario } from '../../../index';

@Prop.Class()
export class Nota extends Model
{
    static override type = 'Nota';
    override type: string = Nota.type;

    @Prop.Set( PropBehavior.datetime ) fecha?: string;
    @Prop.Set() descripcion?: string;
    @Prop.Set( PropBehavior.model, x => new DocumentoFuente( x ) ) documentoFuente?: DocumentoFuente;
    @Prop.Set( PropBehavior.model, x => new Usuario( x ) ) usuario?: Usuario;
    
    get dateTimeFecha(): DateTime {
        return Prop.toDateTime( this.fecha );
    }


    constructor( item?: Partial<Nota> )
    {
        super();
        Prop.initialize( this, item );
    }


    static initialize(data: Partial<Nota>[]): Nota[] 
    {
        return data.map( item =>
            new (
                Prop.GetClass<Nota>( item.type )
                ?? Nota
            ) ( item )
        )
    }
}