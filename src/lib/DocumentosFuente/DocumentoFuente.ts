import { DateTime } from 'luxon';
import { KardexBienConsumo, Model, Nota, Prop, PropBehavior, Usuario } from '../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class DocumentoFuente extends Model
{
    static override type: string = 'DocumentoFuente';
    override type: string = DocumentoFuente.type;

    @Prop.Set() codigoSerie?: string;
    @Prop.Set() codigoNumero?: number;
    @Prop.Set() concepto?: string;

    get codigoCompleto(): string | undefined {
        const codigoSerie = this.codigoSerie ?? '';
        const codigoNumero = this.codigoNumero !== undefined ? this.codigoNumero.toString() : '';
        const separator = codigoSerie && codigoNumero ? ' - ' : '';
        
        const nombreCompleto = `${codigoSerie}${separator}${codigoNumero}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }

    @Prop.Set( PropBehavior.datetime ) fechaCreacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaActualizacion?: string;
    @Prop.Set( PropBehavior.datetime ) fechaEmision?: string;
    @Prop.Set( PropBehavior.datetime ) fechaAnulacion?: string;

    get dateTimeCreacion(): DateTime {
        return Prop.toDateTime( this.fechaCreacion );
    }
    get dateTimeActualizacion(): DateTime {
        return Prop.toDateTime( this.fechaActualizacion );
    }
    get dateTimeEmision(): DateTime {
        return Prop.toDateTime( this.fechaEmision );
    }
    get dateTimeAnulacion(): DateTime {
        return Prop.toDateTime( this.fechaAnulacion );
    }

    
    @Prop.Set( PropBehavior.model, x => new Usuario( x ) ) usuario?: Usuario;
    @Prop.Set( PropBehavior.array, x => new Nota( x ) ) notas?: Nota[];

    @Prop.Set() importeNeto?: number;
    get decimalImporteNeto(): Decimal {
        return Prop.toDecimal( this.importeNeto );
    }

    constructor( item?: Partial<DocumentoFuente> )
    {
        super();
        Prop.initialize( this, item );
    }


    static initialize( data: Partial<DocumentoFuente>[] ): DocumentoFuente[]
    {
        return data.map( item => new ( Prop.GetClass<DocumentoFuente>( item ) ?? DocumentoFuente ) ( item ) )
    }


    override set(item: Partial<DocumentoFuente>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this
    {
        super.setRelation();

        this.set({
            notas: this.notas?.map( nota => nota.set({
                documentoFuente: new DocumentoFuente({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            }) )
        });
        
        return this;
    }


    // Notas
    agregarNota( nota: Nota ): this
    {
        nota.fecha = nota.fecha ?? Prop.toDateTimeNow().toSQL();
        this.notas?.unshift( nota );
        return this;
    }


    eliminarNota( nota: Nota ): this
    {
        this.notas = this.notas?.filter( n => n.symbol !== nota.symbol );
        this.notas = this.notas?.filter( n =>
            ( n.id === undefined || nota.id === undefined )
            ? true
            : ( n.id !== nota.id )
        );

        return this;
    }


    // ESTADOS
    crearYemitir(): this
    {
        const dateTimeEmision = Prop.toDateTimeNow();
        this.fechaCreacion = dateTimeEmision.toSQL();
        this.fechaActualizacion = dateTimeEmision.toSQL();
        this.fechaEmision = dateTimeEmision.toSQL();

        this.procesarInformacion();
        return this;
    }

    anular(): this
    {
        const dateTimeAnulacion = Prop.toDateTimeNow()
        this.fechaAnulacion = dateTimeAnulacion.toSQL();
        this.fechaActualizacion = dateTimeAnulacion.toSQL();

        this.procesarInformacion();
        return this;
    }


    // PROCESAMIENTO
    procesarInformacion(): this
    {
        this.procesarEstado()
            .setRelation();
            
        return this;
    }


    protected procesarEstado(): this
    {
        this.fechaAnulacion = ( this.dateTimeEmision.isValid && this.dateTimeAnulacion.isValid ) &&
                            this.dateTimeEmision > this.dateTimeAnulacion
                                ? ( this.dateTimeEmision.toSQL() ?? undefined )
                                : this.fechaAnulacion;

        return this;
    }


    // CONVERSION
    toRecordKardexBienConsumo( record: Record<string,KardexBienConsumo> = {} ): Record<string,KardexBienConsumo>
    {
        return record;
    }
}