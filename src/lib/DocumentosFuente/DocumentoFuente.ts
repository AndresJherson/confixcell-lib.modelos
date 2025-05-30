import { DateTime } from 'luxon';
import { BienConsumo, KardexBienConsumo, Model, Nota, Prop, PropBehavior, Usuario } from '../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class DocumentoFuente extends Model
{
    static override type: string = 'DocumentoFuente';
    override type: string = DocumentoFuente.type;

    @Prop.Set() codigoSerie?: string;
    @Prop.Set() codigoNumero?: number;
    @Prop.Set() concepto?: string;

    get codigoCompleto(): string {
        const codigoSerie = this.codigoSerie ? this.codigoSerie : '';
        const codigoNumero = this.codigoNumero !== undefined ? this.codigoNumero.toString() : '';
        const separator = codigoSerie && codigoNumero ? ' - ' : '';
        return `${codigoSerie}${separator}${codigoNumero}`;
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
    
    @Prop.Set() importeNeto: number = 0;
    get decimalImporteNeto(): Decimal {
        return Prop.toDecimal( this.importeNeto );
    }
    
    @Prop.Set( PropBehavior.model, x => new Usuario( x ) ) usuario?: Usuario;
    @Prop.Set( PropBehavior.array, x => new Nota( x ) ) notas: Nota[] = [];


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


    override setRelation(keys?: {
        documentoFuenteId: number,
        notaId: number
    }): this {
        
        this.set({
            id: keys?.documentoFuenteId ?? this.id
        });
        if ( keys?.documentoFuenteId ) keys.documentoFuenteId++;


        this.notas.forEach( nota => {

            nota.set({
                id: keys?.notaId ?? nota.id,
                documentoFuente: new DocumentoFuente({ id: this.id, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            if ( keys?.notaId ) keys.notaId++;

        } )

        
        return this;
    }


    // Notas
    agregarNota( nota: Nota ): this
    {
        nota.fecha = nota.fecha ?? Prop.toDateTimeNow().toSQL();
        this.notas.unshift( nota );
        return this;
    }


    eliminarNota( nota: Nota ): this
    {
        this.notas = this.notas.filter( n => n.symbol !== nota.symbol );
        this.notas = this.notas.filter( n =>
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
        return this;
    }

    anular(): this
    {
        const dateTimeAnulacion = Prop.toDateTimeNow()
        this.fechaAnulacion = dateTimeAnulacion.toSQL();
        this.fechaActualizacion = dateTimeAnulacion.toSQL();
        return this;
    }


    // PROCESAMIENTO
    procesarInformacion(): this
    {
        this.procesarEstado();
        return this;
    }


    protected procesarEstado(): this
    {
        const dateTimeEmision = Prop.toDateTime( this.fechaEmision );
        const dateTimeAnulacion = Prop.toDateTime( this.fechaAnulacion );

        this.fechaAnulacion = ( dateTimeEmision.isValid && dateTimeAnulacion.isValid ) && 
                            dateTimeEmision > dateTimeAnulacion
                                ? dateTimeEmision.toSQL()
                                : this.fechaAnulacion;

        return this;
    }


    // CONVERSION
    toRecordKardexBienConsumo( record: Record<string,KardexBienConsumo> ): Record<string,KardexBienConsumo>
    {
        return record;
    }
}