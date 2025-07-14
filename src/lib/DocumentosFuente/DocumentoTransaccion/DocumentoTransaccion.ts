import Decimal from "decimal.js";
import { Cast, DocumentoEntradaBienConsumo, DocumentoEntradaEfectivo, DocumentoFuente, DocumentoSalidaBienConsumo, DocumentoSalidaEfectivo, EntradaBienConsumo, EntradaEfectivo, ExecutionContext, KardexBienConsumo, ModelType, OptionalModel, Prop, PropBehavior, SalidaBienConsumo, SalidaEfectivo, SalidaProduccion } from '../../../index';
import { DateTime } from "luxon";

@Prop.Class()
export class DocumentoTransaccion extends DocumentoFuente {

    static override type = ModelType.DocumentoTransaccion;
    override type = ModelType.DocumentoTransaccion;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new DocumentoEntradaEfectivo( x ) } ) docsEntradaEfectivo?: DocumentoEntradaEfectivo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new DocumentoEntradaBienConsumo( x ) } ) docsEntradaBienConsumo?: DocumentoEntradaBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new DocumentoSalidaEfectivo( x ) } ) docsSalidaEfectivo?: DocumentoSalidaEfectivo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new DocumentoSalidaBienConsumo( x ) } ) docsSalidaBienConsumo?: DocumentoSalidaBienConsumo[] | null;

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

    @Prop.Set() importeValorEntradaEfectivo?: number | null;
    @Prop.Set() importeValorEntradaBienConsumo?: number | null;

    get decimalImporteValorEntradaEfectivo(): Decimal { return Cast.toDecimal( this.importeValorEntradaEfectivo ); }
    get decimalImporteValorEntradaBienConsumo(): Decimal { return Cast.toDecimal( this.importeValorEntradaBienConsumo ); }

    @Prop.Set() importeValorSalidaEfectivo?: number | null;
    @Prop.Set() importeCostoSalidaBienConsumo?: number | null;
    @Prop.Set() importeValorSalidaBienConsumo?: number | null;
    @Prop.Set() importeCostoSalidaProduccion?: number | null;
    @Prop.Set() importeValorSalidaProduccion?: number | null;

    get decimalImporteValorSalidaEfectivo(): Decimal { return Cast.toDecimal( this.importeValorSalidaEfectivo ); }
    get decimalImporteCostoSalidaBienConsumo(): Decimal { return Cast.toDecimal( this.importeCostoSalidaBienConsumo ); }
    get decimalImporteValorSalidaBienConsumo(): Decimal { return Cast.toDecimal( this.importeValorSalidaBienConsumo ); }
    get decimalImporteCostoSalidaProduccion(): Decimal { return Cast.toDecimal( this.importeCostoSalidaProduccion ); }
    get decimalImporteValorSalidaProduccion(): Decimal { return Cast.toDecimal( this.importeValorSalidaProduccion ); }

    @Prop.Set() importeBruto?: number | null;

    get decimalImporteBruto(): Decimal { return Cast.toDecimal( this.importeBruto ); }


    get importeDevengado(): number { return 0; }
    get importeLiquidado(): number { return 0; }

    get decimalImporteDevengado(): Decimal { return Cast.toDecimal( this.importeDevengado ); }
    get decimalImporteLiquidado(): Decimal { return Cast.toDecimal( this.importeLiquidado ); }


    constructor( item?: OptionalModel<DocumentoTransaccion> ) {
        super();
        Prop.initialize( this, item );
    }


    static override initialize( data: OptionalModel<DocumentoTransaccion>[] ): DocumentoTransaccion[] {
        return data.map( item => new ( Prop.getClass<DocumentoTransaccion>( item ) ?? DocumentoTransaccion )( item ) )
    }


    override set( item: OptionalModel<DocumentoTransaccion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoTransaccion> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, DocumentoTransaccion.type, () => {

            this.docsEntradaEfectivo?.forEach( item => item.assign({
                documentoTransaccion: this
            }).setRelation( context ) );

            this.docsEntradaBienConsumo?.forEach( item => item.assign({
                documentoTransaccion: this
            }).setRelation( context ) );

            this.docsSalidaEfectivo?.forEach( item => item.assign({
                documentoTransaccion: this
            }).setRelation( context ) );

            this.docsSalidaBienConsumo?.forEach( item => item.assign({
                documentoTransaccion: this
            }).setRelation( context ) );

        } )

        return this;
    }


    // Doc Entrada de Efectivo
    agregarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this {
        this.docsEntradaEfectivo ??= [];
        this.docsEntradaEfectivo?.push( docEntradaEfectivo.set( {
            fechaEmision: docEntradaEfectivo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docEntradaEfectivo.fechaAnulacion ?? this.fechaAnulacion
        } ) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this {
        if ( this.docsEntradaEfectivo ) {
            const i = this.docsEntradaEfectivo.findIndex( doc => doc.isSameIdentity( docEntradaEfectivo ) );

            if ( i !== -1 ) {
                this.docsEntradaEfectivo[i] = docEntradaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): this {
        this.docsEntradaEfectivo = this.docsEntradaEfectivo?.filter( doc => !doc.isSameIdentity( docEntradaEfectivo ) );
        this.procesarInformacion();
        return this;
    }


    getDocEntradaEfectivo( docEntradaEfectivo: DocumentoEntradaEfectivo ): DocumentoEntradaEfectivo | undefined {
        if ( !this.docsEntradaEfectivo ) return undefined;
        const i = this.docsEntradaEfectivo.findIndex( doc => doc.isSameIdentity( docEntradaEfectivo ) );
        return this.docsEntradaEfectivo[i];
    }


    // Doc Entrada de Bien Consumo
    agregarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this {
        this.docsEntradaBienConsumo ??= [];
        this.docsEntradaBienConsumo?.push( docEntradaBienConsumo.set( {
            fechaEmision: docEntradaBienConsumo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docEntradaBienConsumo.fechaAnulacion ?? this.fechaAnulacion
        } ) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this {
        if ( this.docsEntradaBienConsumo ) {
            const i = this.docsEntradaBienConsumo.findIndex( doc => doc.isSameIdentity( docEntradaBienConsumo ) );
            if ( i !== -1 ) {
                this.docsEntradaBienConsumo[i] = docEntradaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): this {
        this.docsEntradaBienConsumo = this.docsEntradaBienConsumo?.filter( doc => !doc.isSameIdentity( docEntradaBienConsumo ) );
        this.procesarInformacion();
        return this;
    }


    getDocEntradaBienConsumo( docEntradaBienConsumo: DocumentoEntradaBienConsumo ): DocumentoEntradaBienConsumo | undefined {
        if ( !this.docsEntradaBienConsumo ) return undefined;
        const i = this.docsEntradaBienConsumo.findIndex( doc => doc.isSameIdentity( docEntradaBienConsumo ) );
        return this.docsEntradaBienConsumo[i];
    }


    // Doc Salida de efectivo
    agregarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this {
        this.docsSalidaEfectivo ??= [];
        this.docsSalidaEfectivo?.push( docSalidaEfectivo.set( {
            fechaEmision: docSalidaEfectivo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docSalidaEfectivo.fechaAnulacion ?? this.fechaAnulacion
        } ) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this {
        if ( this.docsSalidaEfectivo ) {
            const i = this.docsSalidaEfectivo.findIndex( doc => doc.isSameIdentity( docSalidaEfectivo ) );

            if ( i !== -1 ) {
                this.docsSalidaEfectivo[i] = docSalidaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): this {
        this.docsSalidaEfectivo = this.docsSalidaEfectivo?.filter( doc => !doc.isSameIdentity( docSalidaEfectivo ) );
        this.procesarInformacion();
        return this;
    }


    getDocSalidaEfectivo( docSalidaEfectivo: DocumentoSalidaEfectivo ): DocumentoSalidaEfectivo | undefined {
        if ( !this.docsSalidaEfectivo ) return undefined;
        const i = this.docsSalidaEfectivo.findIndex( doc => doc.isSameIdentity( docSalidaEfectivo ) );
        return this.docsSalidaEfectivo[i];
    }


    // Doc Salida de Bien Consumo
    agregarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this {
        this.docsSalidaBienConsumo ??= [];
        this.docsSalidaBienConsumo?.push( docSalidaBienConsumo.set( {
            fechaEmision: docSalidaBienConsumo.fechaEmision ?? this.fechaEmision,
            fechaAnulacion: docSalidaBienConsumo.fechaAnulacion ?? this.fechaAnulacion
        } ) );
        this.procesarInformacion();
        return this;
    }


    actualizarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this {
        if ( this.docsSalidaBienConsumo ) {
            const i = this.docsSalidaBienConsumo.findIndex( doc => doc.isSameIdentity( docSalidaBienConsumo ) );

            if ( i !== -1 ) {
                this.docsSalidaBienConsumo[i] = docSalidaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): this {
        this.docsSalidaBienConsumo = this.docsSalidaBienConsumo?.filter( doc => !doc.isSameIdentity( docSalidaBienConsumo ) );
        this.procesarInformacion();
        return this;
    }


    getDocSalidaBienConsumo( docSalidaBienConsumo: DocumentoSalidaBienConsumo ): DocumentoSalidaBienConsumo | undefined {
        if ( !this.docsSalidaBienConsumo ) return undefined;
        const i = this.docsSalidaBienConsumo.findIndex( doc => doc.isSameIdentity( docSalidaBienConsumo ) );
        return this.docsSalidaBienConsumo[i];
    }


    // ESTADOS
    crear() {
        const dateTimeCreacion = DateTime.local();
        this.fechaCreacion = dateTimeCreacion.toSQL();
        this.fechaActualizacion = dateTimeCreacion.toSQL();

        this.procesarInformacion();
        return this;
    }


    actualizar() {
        this.fechaActualizacion = DateTime.local().toSQL();

        this.procesarInformacion();
        return this;
    }


    emitir() {
        const dateTimeEmision = DateTime.local();
        this.fechaActualizacion = dateTimeEmision.toSQL();
        this.fechaEmision = dateTimeEmision.toSQL();

        this.procesarInformacion();
        return this;
    }


    protected override procesarEstado(): this {
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


    override procesarInformacion(): this {
        super.procesarInformacion()
            .procesarInformacionEntrada()
            .procesarInformacionSalida();

        return this;
    }


    procesarInformacionEntrada(): this {
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


    procesarInformacionSalida(): this {
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

            this.set( {
                importeCostoSalidaBienConsumo: recordImportesSalidaBienConsumo?.importeCostoNeto.toNumber(),
                importeValorSalidaBienConsumo: recordImportesSalidaBienConsumo?.importePrecioNeto.toNumber()
            } )
        }
        catch ( erorr ) {
            this.set( {
                importeCostoSalidaBienConsumo: 0,
                importeValorSalidaBienConsumo: 0
            } )
        }

        return this;
    }



    override toRecordKardexBienConsumo( record: Record<string, KardexBienConsumo> = {} ): Record<string, KardexBienConsumo> {
        super.toRecordKardexBienConsumo( record );

        this.docsEntradaBienConsumo?.forEach( doc => doc.toRecordKardexBienConsumo( record ) );
        this.docsSalidaBienConsumo?.forEach( doc => doc.toRecordKardexBienConsumo( record ) );
        return record;
    }
}