import { DateTime } from 'luxon';
import { Cast, DocumentoIdentificacion, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SubUsuario } from '../../index';
import { ClassType } from '../../utils/Immutable';

@Prop.Class()
export class Persona extends Model {

    static override type = 'Persona';
    override type = 'Persona';
    private __Persona!: 'Persona';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SubUsuario( x ) } ) subUsuario?: SubUsuario | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new DocumentoIdentificacion( x ) } ) documentoIdentificacion?: DocumentoIdentificacion | null;
    @Prop.Set() codigo?: string | null;

    get nombreCompleto(): string | undefined | null {
        return undefined;
    }

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string | null;

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


    static override initialize<TModel extends Persona, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( Persona, data );
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