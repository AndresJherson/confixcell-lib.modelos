import Decimal from 'decimal.js';
import { Cast, DocumentoTransaccion, EntradaBienConsumo, EntradaEfectivo, ExecutionContext, KardexBienConsumo, KardexMovimientoBienConsumo, ModelType, MovimientoTipoBienConsumo, NotaVentaEntradaEfectivo, NotaVentaEstado, NotaVentaPrioridad, NotaVentaSalidaBienConsumo, NotaVentaSalidaProduccionServicioReparacion, OptionalModel, Persona, Prop, PropBehavior, SalidaBienConsumo, SalidaEfectivo, SalidaProduccion, Usuario } from '../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class NotaVenta extends DocumentoTransaccion {

    static override type = ModelType.NotaVenta;
    override type = ModelType.NotaVenta;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCompromiso?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Persona.initialize( [x] )[0] } ) cliente?: Persona | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVentaPrioridad( x ) } ) prioridad?: NotaVentaPrioridad | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Usuario.initialize( [x] )[0] } ) usuarioTecnico?: Usuario | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVentaEstado( x ) } ) estado?: NotaVentaEstado | null;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaVentaSalidaBienConsumo( x ) } ) salidasBienConsumo?: NotaVentaSalidaBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaVentaSalidaProduccionServicioReparacion( x ) } ) salidasProduccionServicioReparacion?: NotaVentaSalidaProduccionServicioReparacion[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaVentaEntradaEfectivo( x ) } ) entradasEfectivo?: NotaVentaEntradaEfectivo[] | null;

    override get movimientos(): ( EntradaEfectivo | EntradaBienConsumo | SalidaEfectivo | SalidaBienConsumo | SalidaProduccion )[] {
        return [
            ...super.movimientos,
            ...this.salidasBienConsumo ?? [],
            ...this.salidasProduccionServicioReparacion ?? [],
            ...this.entradasEfectivo ?? [],
        ];
    }

    @Prop.Set() override importeBruto?: number | null;
    @Prop.Set() importeDescuento?: number | null;
    @Prop.Set() importeInicial?: number | null;
    @Prop.Set() importeAdicional?: number | null;
    @Prop.Set() override importeNeto?: number | null;

    get decimalImporteDescuento(): Decimal { return Cast.toDecimal( this.importeDescuento ); }
    get decimalImporteInicial(): Decimal { return Cast.toDecimal( this.importeInicial ); }
    get decimalImporteAdicional(): Decimal { return Cast.toDecimal( this.importeAdicional ); }

    override get importeDevengado() {
        return this.decimalImporteValorSalidaEfectivo
            .plus( this.importeValorSalidaBienConsumo ?? 0 )
            .plus( this.importeValorSalidaProduccion ?? 0 )
            .toNumber();
    }

    override get importeLiquidado() {
        return this.decimalImporteValorEntradaEfectivo
            .plus( this.importeValorEntradaBienConsumo ?? 0 )
            .toNumber();
    }

    get dateTimeCompromiso(): DateTime { return Cast.toDateTime( this.fechaCompromiso ); }


    constructor( item?: OptionalModel<NotaVenta> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVenta> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVenta> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaVenta.type, () => {

            this.cliente?.setRelation( context );

            this.prioridad?.setRelation( context );

            this.usuarioTecnico?.setRelation( context );

            this.estado?.setRelation( context );

            this.salidasBienConsumo?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) );

            this.salidasProduccionServicioReparacion?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) );

            this.entradasEfectivo?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) );

        } );

        return this;
    }


    override procesarInformacionEntrada(): this {

        super.procesarInformacionEntrada();
        const prevImporteValorEntradaEfectivo = this.decimalImporteValorEntradaEfectivo;;

        try {
            const importeValorEntradaEfectivo = this.entradasEfectivo?.reduce(
                ( decimal, entrada ) => decimal.plus( entrada.procesarInformacion().importeValorNeto ?? 0 ),
                new Decimal( 0 )
            )
                ?? Decimal( 0 );

            this.importeValorEntradaEfectivo = importeValorEntradaEfectivo.plus( prevImporteValorEntradaEfectivo ).toNumber();
        }
        catch ( error ) {
            this.importeValorEntradaEfectivo = prevImporteValorEntradaEfectivo.toNumber();
        }

        return this;
    }


    override procesarInformacionSalida(): this {
        super.procesarInformacionSalida();

        const prevImporteCostoSalidaBienConsumo = this.decimalImporteCostoSalidaBienConsumo;
        const prevImportePrecioSalidaBienConsumo = this.decimalImporteValorSalidaBienConsumo;

        try {
            const recordImportesSalidaBienConsumo = this.salidasBienConsumo?.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeCostoNeto: importes.importeCostoNeto.plus( salida.importeCostoNeto ?? 0 ),
                        importeValorBruto: importes.importeValorBruto.plus( salida.importeValorBruto ?? 0 ),
                        importeValorDescuento: importes.importeValorDescuento.plus( salida.importeValorDescuento ?? 0 ),
                        importeValorNeto: importes.importeValorNeto.plus( salida.importeValorNeto ?? 0 )
                    };
                },
                {
                    importeCostoNeto: new Decimal( 0 ),
                    importeValorBruto: new Decimal( 0 ),
                    importeValorDescuento: new Decimal( 0 ),
                    importeValorNeto: new Decimal( 0 )
                }
            );

            this.set( {
                importeBruto: recordImportesSalidaBienConsumo?.importeValorBruto.toNumber(),
                importeDescuento: recordImportesSalidaBienConsumo?.importeValorDescuento.toNumber(),
                importeInicial: recordImportesSalidaBienConsumo?.importeValorBruto.minus( recordImportesSalidaBienConsumo.importeValorDescuento ).toNumber(),

                importeCostoSalidaBienConsumo: recordImportesSalidaBienConsumo?.importeCostoNeto.plus( prevImporteCostoSalidaBienConsumo ).toNumber(),
                importeValorSalidaBienConsumo: recordImportesSalidaBienConsumo?.importeValorBruto.minus( recordImportesSalidaBienConsumo.importeValorDescuento )
                    .plus( prevImportePrecioSalidaBienConsumo )
                    .toNumber()
            } )
        }
        catch ( error ) {
            this.set( {
                importeBruto: 0,
                importeDescuento: 0,
                importeInicial: 0,

                importeCostoSalidaBienConsumo: prevImporteCostoSalidaBienConsumo.toNumber(),
                importeValorSalidaBienConsumo: prevImportePrecioSalidaBienConsumo.toNumber()
            } )
        }


        const prevImporteCostoSalidaProduccion = this.decimalImporteCostoSalidaProduccion;
        const prevImportePrecioSalidaProduccion = this.decimalImporteValorSalidaProduccion;

        try {
            const recordImportesSalidaProduccion = this.salidasProduccionServicioReparacion?.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeCostoSalidaProduccion: importes.importeCostoSalidaProduccion.plus( salida.importeCostoNeto ?? 0 ),
                        importePrecioAdicional: importes.importePrecioAdicional.plus( salida.importeValorNeto ?? 0 )
                    }
                },
                {
                    importeCostoSalidaProduccion: new Decimal( 0 ),
                    importePrecioAdicional: new Decimal( 0 )
                }
            )

            this.set( {
                importeAdicional: recordImportesSalidaProduccion?.importePrecioAdicional.toNumber(),
                importeNeto: recordImportesSalidaProduccion?.importePrecioAdicional.plus( this.decimalImporteInicial ).toNumber(),

                importeCostoSalidaProduccion: recordImportesSalidaProduccion?.importeCostoSalidaProduccion.plus( prevImporteCostoSalidaProduccion ).toNumber(),
                importeValorSalidaProduccion: recordImportesSalidaProduccion?.importePrecioAdicional.plus( prevImportePrecioSalidaProduccion ).toNumber()
            } )
        }
        catch ( error ) {
            this.set( {
                importeAdicional: 0,
                importeNeto: this.importeInicial,

                importeCostoSalidaProduccion: prevImporteCostoSalidaProduccion.toNumber(),
                importeValorSalidaProduccion: prevImportePrecioSalidaProduccion.toNumber()
            } )
        }


        return this;
    }


    // Salida Bien de Consumo
    agregarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this {
        this.salidasBienConsumo ??= [];
        this.salidasBienConsumo?.unshift( salidaBienConsumo );
        this.procesarInformacion();
        return this;
    }


    actualizarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this {
        if ( this.salidasBienConsumo ) {
            const i = this.salidasBienConsumo.findIndex( sal => sal.isSameIdentity( salidaBienConsumo ) );

            if ( i !== -1 ) {
                this.salidasBienConsumo[i] = salidaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this {
        this.salidasBienConsumo = this.salidasBienConsumo?.filter( sal => !sal.isSameIdentity( salidaBienConsumo ) );
        this.procesarInformacion();
        return this;
    }


    getSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): NotaVentaSalidaBienConsumo | undefined {
        if ( !this.salidasBienConsumo ) return undefined;
        const i = this.salidasBienConsumo.findIndex( sal => sal.isSameIdentity( salidaBienConsumo ) );
        return this.salidasBienConsumo[i];
    }


    // Salida Produccion de Servicio de Reparacion
    agregarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this {
        this.salidasProduccionServicioReparacion ??= [];
        this.salidasProduccionServicioReparacion?.unshift( salidaProduccionServicioReparacion );
        this.procesarInformacion();
        return this;
    }


    actualizarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this {
        if ( this.salidasProduccionServicioReparacion ) {
            const i = this.salidasProduccionServicioReparacion.findIndex( sal => sal.isSameIdentity( salidaProduccionServicioReparacion ) );

            if ( i !== -1 ) {
                this.salidasProduccionServicioReparacion[i] = salidaProduccionServicioReparacion;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this {
        this.salidasProduccionServicioReparacion = this.salidasProduccionServicioReparacion?.filter( sal => !sal.isSameIdentity( salidaProduccionServicioReparacion ) );
        this.procesarInformacion();
        return this;
    }


    getSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): NotaVentaSalidaProduccionServicioReparacion | undefined {
        if ( !this.salidasProduccionServicioReparacion ) return undefined;
        const i = this.salidasProduccionServicioReparacion.findIndex( sal => sal.isSameIdentity( salidaProduccionServicioReparacion ) );
        return this.salidasProduccionServicioReparacion[i];
    }


    // Entrada de Efectivo
    agregarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this {
        this.entradasEfectivo ??= [];
        this.entradasEfectivo?.unshift( entradaEfectivo );
        this.procesarInformacion();
        return this;
    }


    actualizarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this {
        if ( this.entradasEfectivo ) {
            const i = this.entradasEfectivo.findIndex( ent => ent.isSameIdentity( entradaEfectivo ) );

            if ( i !== -1 ) {
                this.entradasEfectivo[i] = entradaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this {
        this.entradasEfectivo = this.entradasEfectivo?.filter( ent => !ent.isSameIdentity( entradaEfectivo ) );
        this.procesarInformacion();
        return this;
    }


    getEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): NotaVentaEntradaEfectivo | undefined {
        if ( !this.entradasEfectivo ) return undefined;
        const i = this.entradasEfectivo.findIndex( ent => ent.isSameIdentity( entradaEfectivo ) );
        return this.entradasEfectivo[i];
    }


    override toRecordKardexBienConsumo( record: Record<string, KardexBienConsumo> = {} ): Record<string, KardexBienConsumo> {
        super.toRecordKardexBienConsumo( record );

        for ( const sal of this.salidasBienConsumo ?? [] ) {
            const almacenUuid = sal.almacen?.uuid
            const bienConsumoUuid = sal.bienConsumo?.uuid;
            if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;

            const clave = `${almacenUuid}|${bienConsumoUuid}`
            if ( !( clave in record ) ) {
                record[clave] = new KardexBienConsumo( {
                    almacen: sal.almacen,
                    bienConsumo: sal.bienConsumo,
                    movimientos: []
                } )
            }

            record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                uuid: sal.uuid,
                movimientoTipo: MovimientoTipoBienConsumo.SALIDA_NOTA_VENTA,
                fecha: this.fechaEmision,
                documentoFuenteCodigoSerie: this.codigoSerie,
                documentoFuenteCodigoNumero: this.codigoNumero,
                concepto: this.concepto,
                salidaCantidad: sal.cantidadSaliente
            } ) )
        }

        for ( const sal of this.salidasProduccionServicioReparacion ?? [] ) {
            for ( const recurso of sal.recursosBienConsumo ?? [] ) {
                const almacenUuid = recurso.almacen?.uuid
                const bienConsumoUuid = recurso.bienConsumo?.uuid;
                if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;

                const clave = `${almacenUuid}|${bienConsumoUuid}`
                if ( !( clave in record ) ) {
                    record[clave] = new KardexBienConsumo( {
                        almacen: recurso.almacen,
                        bienConsumo: recurso.bienConsumo,
                        movimientos: []
                    } )
                }

                record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                    uuid: recurso.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_NOTA_VENTA_SERVICIO_REPARACION_RECURSO,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: recurso.cantidad
                } ) )
            }
        }

        return record;
    }
}