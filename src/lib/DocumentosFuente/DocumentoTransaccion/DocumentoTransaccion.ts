import Decimal from "decimal.js";
import { DocumentoEntradaBienConsumo, DocumentoEntradaEfectivo, DocumentoFuente, DocumentoSalidaBienConsumo, DocumentoSalidaEfectivo, EntradaBienConsumo, EntradaEfectivo, KardexBienConsumo, Prop, PropBehavior, SalidaBienConsumo, SalidaEfectivo, SalidaProduccion } from '../../../index';

@Prop.Class()
export class DocumentoTransaccion extends DocumentoFuente
{
    static override type = 'DocumentoTransaccion';
    override type: string = DocumentoTransaccion.type;
    
    @Prop.Set( PropBehavior.array, x => new DocumentoEntradaEfectivo( x ) ) docsEntradaEfectivo?: DocumentoEntradaEfectivo[];
    @Prop.Set( PropBehavior.array, x => new DocumentoEntradaBienConsumo( x ) ) docsEntradaBienConsumo?: DocumentoEntradaBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new DocumentoSalidaEfectivo( x ) ) docsSalidaEfectivo?: DocumentoSalidaEfectivo[];
    @Prop.Set( PropBehavior.array, x => new DocumentoSalidaBienConsumo( x ) ) docsSalidaBienConsumo?: DocumentoSalidaBienConsumo[];

    get movimientos(): ( EntradaEfectivo | EntradaBienConsumo | SalidaEfectivo | SalidaBienConsumo | SalidaProduccion )[] {
        return [
            ...this.docsEntradaEfectivo?.flatMap( doc => doc.entradas ?? [] ) ?? [],
            ...this.docsEntradaBienConsumo?.flatMap( doc => doc.entradas ?? [] ) ?? [],
            ...this.docsSalidaEfectivo?.flatMap( doc => doc.salidas ?? [] ) ?? [],
            ...this.docsSalidaBienConsumo?.flatMap( doc => doc.salidas ?? [] ) ?? [],
        ];
    }

    get documentosMovimiento() {
        return [
            ...this.docsEntradaEfectivo ?? [],
            ...this.docsEntradaBienConsumo ?? [],
            ...this.docsSalidaEfectivo ?? [],
            ...this.docsSalidaBienConsumo ?? []
        ]
    }
    
    @Prop.Set() importeValorEntradaEfectivo?: number;
    @Prop.Set() importeValorEntradaBienConsumo?: number;

    get decimalImporteValorEntradaEfectivo(): Decimal {
        return Prop.toDecimal( this.importeValorEntradaEfectivo );
    }
    get decimalImporteValorEntradaBienConsumo(): Decimal {
        return Prop.toDecimal( this.importeValorEntradaBienConsumo );
    }

    @Prop.Set() importeValorSalidaEfectivo?: number;
    @Prop.Set() importeCostoSalidaBienConsumo?: number;
    @Prop.Set() importeValorSalidaBienConsumo?: number;
    @Prop.Set() importeCostoSalidaProduccion?: number;
    @Prop.Set() importeValorSalidaProduccion?: number;

    get decimalImporteValorSalidaEfectivo(): Decimal {
        return Prop.toDecimal( this.importeValorSalidaEfectivo );
    }
    get decimalImporteCostoSalidaBienConsumo(): Decimal {
        return Prop.toDecimal( this.importeCostoSalidaBienConsumo );
    }
    get decimalImporteValorSalidaBienConsumo(): Decimal {
        return Prop.toDecimal( this.importeValorSalidaBienConsumo );
    }
    get decimalImporteCostoSalidaProduccion(): Decimal {
        return Prop.toDecimal( this.importeCostoSalidaProduccion );
    }
    get decimalImporteValorSalidaProduccion(): Decimal {
        return Prop.toDecimal( this.importeValorSalidaProduccion );
    }

    @Prop.Set() importeBruto?: number;

    get decimalImporteBruto(): Decimal {
        return Prop.toDecimal( this.importeBruto );
    }


    get importeDevengado(): number{
        return 0;
    }
    get importeLiquidado(): number{
        return 0;
    }

    get decimalImporteDevengado(): Decimal {
        return Prop.toDecimal( this.importeDevengado );
    }
    get decimalImporteLiquidado(): Decimal {
        return Prop.toDecimal( this.importeLiquidado );
    }


    constructor( item?: Partial<DocumentoTransaccion> )
    {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<DocumentoTransaccion>[] ): DocumentoTransaccion[]
    {
        return data.map( item => new ( Prop.GetClass<DocumentoTransaccion>( item ) ?? DocumentoTransaccion ) ( item ) )
    }


    override set( item: Partial<DocumentoTransaccion> ): this {
        return super.set( item as Partial<this> );
    }
    

    override setRelation(): this 
    {
        super.setRelation();
        
        this.docsEntradaEfectivo?.forEach( doc => 
            doc.set({
                documentoTransaccion: new DocumentoTransaccion({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
            })
            .setRelation()
        )

        this.docsEntradaBienConsumo?.forEach( doc => 
            doc.set({
                documentoTransaccion: new DocumentoTransaccion({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
            })
            .setRelation()
        )


        this.docsSalidaEfectivo?.forEach( doc => 
            doc.set({
                documentoTransaccion: new DocumentoTransaccion({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
            })
            .setRelation()
        )

        this.docsSalidaBienConsumo?.forEach( doc => 
            doc.set({
                documentoTransaccion: new DocumentoTransaccion({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
            })
            .setRelation()
        )

        // this.docsSalidaProduccion.forEach( doc => doc.setRelation( keys ).set({
        //     documentoTransaccion: new DocumentoTransaccion({ id: this.id, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
        // }) );

        return this;
    }


    // Doc Entrada de Efectivo
    agregarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this
    {
        this.docsEntradaEfectivo?.push( docEntradaEfectivo.set({
            fechaEmision: docEntradaEfectivo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docEntradaEfectivo.fechaAnulacion ?? this.fechaAnulacion
        }) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this
    {
        if ( this.docsEntradaEfectivo ) {
            const i = this.docsEntradaEfectivo.findIndex( doc => doc.isSameIdentity( docEntradaEfectivo ) );

            if ( i !== -1 ) {
                this.docsEntradaEfectivo[ i ] = docEntradaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this
    {
        this.docsEntradaEfectivo = this.docsEntradaEfectivo?.filter( doc => !doc.isSameIdentity( docEntradaEfectivo ) );
        this.procesarInformacion();
        return this;
    }


    getDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): DocumentoEntradaEfectivo | undefined
    {
        if ( !this.docsEntradaEfectivo ) return undefined;
        const i = this.docsEntradaEfectivo.findIndex( doc => doc.isSameIdentity( docEntradaEfectivo ) );
        return this.docsEntradaEfectivo[ i ];
    }


    // Doc Entrada de Bien Consumo
    agregarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this
    {
        this.docsEntradaBienConsumo?.push( docEntradaBienConsumo.set({
            fechaEmision: docEntradaBienConsumo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docEntradaBienConsumo.fechaAnulacion ?? this.fechaAnulacion
        }) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this
    {
        if ( this.docsEntradaBienConsumo ) {
            const i = this.docsEntradaBienConsumo.findIndex( doc => doc.isSameIdentity( docEntradaBienConsumo ) );
            if ( i !== -1 ) {
                this.docsEntradaBienConsumo[ i ] = docEntradaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this
    {
        this.docsEntradaBienConsumo = this.docsEntradaBienConsumo?.filter( doc => !doc.isSameIdentity( docEntradaBienConsumo ) );
        this.procesarInformacion();
        return this;
    }


    getDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): DocumentoEntradaBienConsumo | undefined
    {
        if ( !this.docsEntradaBienConsumo ) return undefined;
        const i = this.docsEntradaBienConsumo.findIndex( doc => doc.isSameIdentity( docEntradaBienConsumo ) );
        return this.docsEntradaBienConsumo[ i ];
    }


    // Doc Salida de efectivo
    agregarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this
    {
        this.docsSalidaEfectivo?.push( docSalidaEfectivo.set({
            fechaEmision: docSalidaEfectivo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docSalidaEfectivo.fechaAnulacion ?? this.fechaAnulacion
        }) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this
    {
        if ( this.docsSalidaEfectivo ) {
            const i = this.docsSalidaEfectivo.findIndex( doc => doc.isSameIdentity( docSalidaEfectivo ) );
    
            if ( i !== -1 ) {
                this.docsSalidaEfectivo[ i ] = docSalidaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this
    {
        this.docsSalidaEfectivo = this.docsSalidaEfectivo?.filter( doc => !doc.isSameIdentity( docSalidaEfectivo ) );
        this.procesarInformacion();
        return this;
    }


    getDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): DocumentoSalidaEfectivo | undefined
    {
        if ( !this.docsSalidaEfectivo ) return undefined;
        const i = this.docsSalidaEfectivo.findIndex( doc => doc.isSameIdentity( docSalidaEfectivo ) );
        return this.docsSalidaEfectivo[ i ];
    }


    // Doc Salida de Bien Consumo
    agregarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this
    {
        this.docsSalidaBienConsumo?.push( docSalidaBienConsumo.set({
            fechaEmision: docSalidaBienConsumo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docSalidaBienConsumo.fechaAnulacion ?? this.fechaAnulacion
        }) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this
    {
        if ( this.docsSalidaBienConsumo ) {
            const i = this.docsSalidaBienConsumo.findIndex( doc => doc.isSameIdentity( docSalidaBienConsumo ) );

            if ( i !== -1 ) {
                this.docsSalidaBienConsumo[ i ] = docSalidaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this
    {
        this.docsSalidaBienConsumo = this.docsSalidaBienConsumo?.filter( doc => !doc.isSameIdentity( docSalidaBienConsumo ) );
        this.procesarInformacion();
        return this;
    }


    getDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): DocumentoSalidaBienConsumo | undefined
    {
        if ( !this.docsSalidaBienConsumo ) return undefined;
        const i = this.docsSalidaBienConsumo.findIndex( doc => doc.isSameIdentity( docSalidaBienConsumo ) );
        return this.docsSalidaBienConsumo[ i ];
    }


    // ESTADOS
    crear()
    {
        const dateTimeCreacion = Prop.toDateTimeNow();
        this.fechaCreacion = dateTimeCreacion.toSQL();
        this.fechaActualizacion = dateTimeCreacion.toSQL();

        this.procesarInformacion();
        return this;
    }


    actualizar()
    {
        this.fechaActualizacion = Prop.toDateTimeNow().toSQL();

        this.procesarInformacion();
        return this;
    }


    emitir()
    {
        const dateTimeEmision = Prop.toDateTimeNow();
        this.fechaActualizacion = dateTimeEmision.toSQL();
        this.fechaEmision = dateTimeEmision.toSQL();

        this.procesarInformacion();
        return this;
    }


    protected override procesarEstado(): this 
    {
        super.procesarEstado();
        
        if ( this.dateTimeEmision.isValid ) {
            this.documentosMovimiento.forEach( doc => {

                doc.fechaEmision = doc.dateTimeEmision.isValid && doc.dateTimeEmision >= this.dateTimeEmision
                                    ? ( doc.dateTimeEmision.toSQL() ?? undefined )
                                    : ( this.dateTimeEmision.toSQL() ?? undefined );

                doc.fechaAnulacion = ( doc.dateTimeEmision.isValid && doc.dateTimeAnulacion.isValid ) &&
                                    doc.dateTimeEmision > doc.dateTimeAnulacion
                                        ? ( doc.dateTimeEmision.toSQL() ?? undefined )
                                        : doc.fechaAnulacion;

            } )
        }

        return this;
    }


    override procesarInformacion(): this
    {   
        super.procesarInformacion()
            .procesarInformacionEntrada()
            .procesarInformacionSalida();

        return this;
    }


    procesarInformacionEntrada(): this
    {
        if ( !this.dateTimeEmision.isValid ) {
            this.docsEntradaEfectivo = [];
            this.docsEntradaBienConsumo = [];
        }

        try {
            this.importeValorEntradaEfectivo = this.docsEntradaEfectivo?.filter( doc => doc.fechaAnulacion === undefined )
                .reduce(
                    ( decimal, doc ) => decimal.plus( doc.procesarInformacion().importeNeto ?? 0 ),
                    new Decimal( 0 )
                )
                .toNumber();
        }
        catch ( error ) {
            this.importeValorEntradaEfectivo = 0;
        }

        try {
            this.importeValorEntradaBienConsumo = this.docsEntradaBienConsumo?.filter( doc => doc.fechaAnulacion === undefined )
                .reduce(
                    ( decimal, doc ) => decimal.plus( doc.procesarInformacion().importeNeto ?? 0 ),
                    new Decimal( 0 )
                )
                .toNumber();
        }
        catch ( error ) {
            this.importeValorEntradaBienConsumo = 0;
        }

        return this;
    }


    procesarInformacionSalida(): this
    {
        if ( !this.dateTimeEmision.isValid ) {
            this.docsSalidaEfectivo = [];
            this.docsSalidaBienConsumo = [];
        }

        try {
            this.importeValorSalidaEfectivo = this.docsSalidaEfectivo?.filter( doc => doc.fechaAnulacion === undefined )
                .reduce(
                    ( decimal, doc ) => decimal.plus( doc.procesarInformacion().importeNeto ?? 0 ),
                    new Decimal( 0 )
                )
                .toNumber();
        }
        catch ( error ) {
            this.importeValorSalidaEfectivo = 0;
        }


        try {
            const recordImportesSalidaBienConsumo = this.docsSalidaBienConsumo?.filter( doc => doc.fechaAnulacion === undefined )
                .reduce(
                    ( importes, doc ) => {
                        doc.procesarInformacion();
                        importes.importeCostoNeto.plus( doc.importeCostoNeto ?? 0 );
                        importes.importePrecioNeto.plus( doc.importeNeto ?? 0 );
                        return importes;
                    },
                    {
                        importeCostoNeto: new Decimal( 0 ),
                        importePrecioNeto: new Decimal( 0 ),
                    }
                );

            this.set({
                importeCostoSalidaBienConsumo: recordImportesSalidaBienConsumo?.importeCostoNeto.toNumber(),
                importeValorSalidaBienConsumo: recordImportesSalidaBienConsumo?.importePrecioNeto.toNumber()
            })
        }
        catch( erorr ) {
            this.set({
                importeCostoSalidaBienConsumo: 0,
                importeValorSalidaBienConsumo: 0
            })
        }

        return this;
    }



    override toRecordKardexBienConsumo(record: Record<string, KardexBienConsumo> = {}): Record<string, KardexBienConsumo>
    {
        super.toRecordKardexBienConsumo(record);
        
        this.docsEntradaBienConsumo?.forEach( doc => doc.toRecordKardexBienConsumo(record) );
        this.docsSalidaBienConsumo?.forEach( doc => doc.toRecordKardexBienConsumo(record) );
        return record;
    }
}