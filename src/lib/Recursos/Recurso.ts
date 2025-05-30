import { DateTime } from 'luxon';
import { Model, Prop, PropBehavior } from '../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class Recurso extends Model
{
    static override type = 'Recurso';
    override type: string = Recurso.type;

    @Prop.Set() codigo?: string;
    @Prop.Set() esSalida?: boolean;
    
    get nombreCompleto(): string {
        return ``;
    }

    @Prop.Set() precioUnitario: number = 0;
    get decimalPrecioUnitario(): Decimal {
        return Prop.toDecimal( this.precioUnitario );
    }

    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;

    get dateTimeCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }



    constructor( item?: Partial<Recurso> )
    {
        super();
        Prop.initialize( this, item );
    }


    static initialize( data: Partial<Recurso>[] ): Recurso[]
    {
        return data.map( item => new ( Prop.GetClass<Recurso>( item ) ?? Recurso ) ( item ) )
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