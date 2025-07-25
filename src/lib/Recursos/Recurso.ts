import { DateTime } from 'luxon';
import { Cast, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';

@Prop.Class()
export class Recurso extends Model {

    static override type = ModelType.Recurso;
    override type = ModelType.Recurso;

    @Prop.Set() codigo?: string | null;
    @Prop.Set() esActualizable?: boolean | null;
    @Prop.Set() esSalida?: boolean | null;

    get nombreCompleto(): string | undefined | null {
        return undefined;
    }

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string | null;

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


    static override initialize( data: OptionalModel<Recurso>[] ): Array<Recurso | null> {
        return Prop.arrayInitialize( Recurso, data );
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