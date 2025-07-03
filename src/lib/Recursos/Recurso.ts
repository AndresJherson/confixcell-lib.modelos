import { DateTime } from 'luxon';
import { Model, ModelType, Prop, PropBehavior } from '../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class Recurso extends Model {

    static override type = ModelType.Recurso;
    override type = ModelType.Recurso;

    @Prop.Set() codigo?: string;
    @Prop.Set() esEditable?: boolean;
    @Prop.Set() esSalida?: boolean;

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



    constructor( item?: Partial<Recurso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<Recurso> ): this {
        return super.set( item as Partial<this> );
    }


    static initialize( data: Partial<Recurso>[] ): Recurso[] {
        return data.map( item => new ( Prop.GetClass<Recurso>( item ) ?? Recurso )( item ) )
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
}