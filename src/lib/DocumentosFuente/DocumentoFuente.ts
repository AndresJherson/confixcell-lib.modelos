import { DateTime } from 'luxon';
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, Nota, OptionalModel, Prop, PropBehavior, Usuario } from '../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class DocumentoFuente extends Model {

    static override type = ModelType.DocumentoFuente;
    override type = ModelType.DocumentoFuente;

    @Prop.Set() codigoSerie?: string | null;
    @Prop.Set() codigoNumero?: number | null;
    @Prop.Set() concepto?: string | null;

    get codigoCompleto(): string | undefined {
        const codigoSerie = this.codigoSerie ?? '';
        const codigoNumero = this.codigoNumero != null ? this.codigoNumero.toString() : '';
        const separator = codigoSerie && codigoNumero ? ' - ' : '';

        const nombreCompleto = `${codigoSerie}${separator}${codigoNumero}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaEmision?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaAnulacion?: string | null;

    get dateTimeCreacion(): DateTime { return Cast.toDateTime( this.fechaCreacion ); }
    get dateTimeActualizacion(): DateTime { return Cast.toDateTime( this.fechaActualizacion ); }
    get dateTimeEmision(): DateTime { return Cast.toDateTime( this.fechaEmision ); }
    get dateTimeAnulacion(): DateTime { return Cast.toDateTime( this.fechaAnulacion ); }


    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Usuario.initialize( [x] )[0] } ) usuario?: Usuario | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new Nota( x ) } ) notas?: Nota[] | null;

    @Prop.Set() importeNeto?: number | null;
    get decimalImporteNeto(): Decimal { return Cast.toDecimal( this.importeNeto ); }


    constructor( item?: OptionalModel<DocumentoFuente> ) {
        super();
        Prop.initialize( this, item );
    }


    static initialize( data: OptionalModel<DocumentoFuente>[] ): DocumentoFuente[] {
        return data.map( item => new ( Prop.getClass<DocumentoFuente>( item ) ?? DocumentoFuente )( item ) )
    }


    override set( item: OptionalModel<DocumentoFuente> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoFuente> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoFuente.type, () => {

            this.usuario?.setRelation( context );

            this.notas?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) );

        } );

        return this;
    }


    // Notas
    agregarNota( nota: Nota ): this {
        this.notas ??= [];
        nota.fecha = nota.fecha ?? DateTime.local().toSQL();
        this.notas?.unshift( nota );
        return this;
    }


    eliminarNota( nota: Nota ): this {
        this.notas = this.notas?.filter( n => !n.isSameIdentity( nota ) );
        return this;
    }


    // ESTADOS
    crearYemitir(): this {
        const dateTimeEmision = DateTime.local();
        this.fechaCreacion = dateTimeEmision.toSQL();
        this.fechaActualizacion = dateTimeEmision.toSQL();
        this.fechaEmision = dateTimeEmision.toSQL();

        this.procesarInformacion();
        return this;
    }

    anular(): this {
        const dateTimeAnulacion = DateTime.local()
        this.fechaAnulacion = dateTimeAnulacion.toSQL();
        this.fechaActualizacion = dateTimeAnulacion.toSQL();

        this.procesarInformacion();
        return this;
    }


    // PROCESAMIENTO
    procesarInformacion(): this {
        this.procesarEstado()
            .setRelation();

        return this;
    }


    protected procesarEstado(): this {
        this.fechaAnulacion = ( this.dateTimeEmision.isValid && this.dateTimeAnulacion.isValid ) &&
            this.dateTimeEmision > this.dateTimeAnulacion
            ? ( this.dateTimeEmision.toSQL() ?? undefined )
            : this.fechaAnulacion;

        return this;
    }


    // CONVERSION
    toRecordKardexBienConsumo( record: Record<string, KardexBienConsumo> = {} ): Record<string, KardexBienConsumo> {
        return record;
    }
}