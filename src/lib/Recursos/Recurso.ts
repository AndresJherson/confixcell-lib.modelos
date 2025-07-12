import { DateTime } from 'luxon';
import { Cast, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class Recurso extends Model {

    static override type = ModelType.Recurso;
    override type = ModelType.Recurso;

    @Prop.Set() codigo?: string;
    @Prop.Set() esActualizable?: boolean;
    @Prop.Set() esSalida?: boolean;

    get nombreCompleto(): string | undefined {
        return undefined;
    }

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string;

    get dateTimeCreacion(): DateTime { return Cast.toDateTime( this.fechaCreacion ); }
    get dateTimeActualizacion(): DateTime { return Cast.toDateTime( this.fechaActualizacion ); }



    constructor( item?: OptionalModel<Recurso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Recurso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Recurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static initialize( data: OptionalModel<Recurso>[] ): Recurso[] {
        return data.map( item => new ( Prop.getClass<Recurso>( item ) ?? Recurso )( item ) )
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
}