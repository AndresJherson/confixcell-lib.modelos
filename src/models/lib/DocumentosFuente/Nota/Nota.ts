import { DateTime } from 'luxon';
import { Cast, DocumentoFuente, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, Usuario } from '../../../index';

@Prop.Class()
export class Nota extends Model {

    static override type = 'Nota';
    override type = 'Nota';
    private __Nota!: 'Nota';

    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
    @Prop.Set() descripcion?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => DocumentoFuente.initialize( [x] )[0] } ) documentoFuente?: DocumentoFuente | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Usuario.initialize( [x] )[0] } ) usuario?: Usuario | null;

    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }


    constructor( item?: OptionalModel<Nota> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Nota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Nota> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, Nota.type, () => {

            this.documentoFuente?.setRelation( context );

            this.usuario?.setRelation( context );

        } );

        return this;
    }
}