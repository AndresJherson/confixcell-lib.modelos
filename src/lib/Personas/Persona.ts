import { DateTime } from 'luxon';
import { Cast, DocumentoIdentificacion, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SubUsuario } from '../../index';

@Prop.Class()
export class Persona extends Model {

    static override type = ModelType.Persona;
    override type = ModelType.Persona;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SubUsuario( x ) } ) subUsuario?: SubUsuario;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new DocumentoIdentificacion( x ) } ) documentoIdentificacion?: DocumentoIdentificacion;
    @Prop.Set() codigo?: string;

    get nombreCompleto(): string | undefined {
        return undefined;
    }

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string;

    get dateTimeCreacion(): DateTime { return Cast.toDateTime( this.fechaCreacion ); }
    get dateTimeActualizacion(): DateTime { return Cast.toDateTime( this.fechaActualizacion ); }


    constructor( item?: OptionalModel<Persona> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Persona> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Persona> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, Persona.type, () => {

            this.subUsuario?.assign( {
                persona: this
            } ).setRelation( context );

            this.documentoIdentificacion?.setRelation( context );

        } );

        return this;
    }


    static initialize( data: OptionalModel<Persona>[] ): Persona[] {
        return data.map( item => new ( Prop.getClass<Persona>( item ) ?? Persona )( item ) )
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