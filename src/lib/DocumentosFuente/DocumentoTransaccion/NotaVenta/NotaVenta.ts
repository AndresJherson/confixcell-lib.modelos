import Decimal from 'decimal.js';
import { Cliente, DocumentoTransaccion, KardexBienConsumo, KardexMovimientoBienConsumo, MovimientoTipoBienConsumo, NotaVentaEntradaEfectivo, NotaVentaEstado, NotaVentaPrioridad, NotaVentaSalidaBienConsumo, NotaVentaSalidaProduccionServicioReparacion, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo, Prop, PropBehavior, Usuario } from '../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class NotaVenta extends DocumentoTransaccion
{
    static override type: string = 'NotaVenta';
    override type: string = NotaVenta.type;

    @Prop.Set( PropBehavior.datetime ) fechaCompromiso?: string;
    @Prop.Set( PropBehavior.model, x => new Cliente( x ) ) cliente?: Cliente;
    @Prop.Set( PropBehavior.model, x => new NotaVentaPrioridad( x ) ) prioridad?: NotaVentaPrioridad;
    @Prop.Set( PropBehavior.model, x => new Usuario( x ) ) usuarioTecnico?: Usuario;
    @Prop.Set( PropBehavior.model, x => new NotaVentaEstado( x ) ) estado?: NotaVentaEstado;

    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaBienConsumo( x ) ) salidasBienConsumo?: NotaVentaSalidaBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaProduccionServicioReparacion( x ) ) salidasProduccionServicioReparacion?: NotaVentaSalidaProduccionServicioReparacion[];
    @Prop.Set( PropBehavior.array, x => new NotaVentaEntradaEfectivo( x ) ) entradasEfectivo?: NotaVentaEntradaEfectivo[];

    override get movimientos() {
        return [
            ...super.movimientos,
            ...this.salidasBienConsumo ?? [],
            ...this.salidasProduccionServicioReparacion ?? [],
            ...this.entradasEfectivo ?? [],
        ];
    }

    @Prop.Set() override importeBruto?: number;
    @Prop.Set() importeDescuento?: number;
    @Prop.Set() importeInicial?: number;
    @Prop.Set() importeAdicional?: number;
    @Prop.Set() override importeNeto?: number;

    get decimalImporteDescuento(): Decimal {
        return Prop.toDecimal( this.importeDescuento );
    }
    get decimalImporteInicial(): Decimal {
        return Prop.toDecimal( this.importeInicial );
    }
    get decimalImporteAdicional(): Decimal {
        return Prop.toDecimal( this.importeAdicional );
    }

    override get importeDevengado() {
        return this.decimalImporteValorSalidaEfectivo
            .plus( this.importePrecioSalidaBienConsumo ?? 0 )
            .plus( this.importePrecioSalidaProduccion ?? 0 )
            .toNumber();
    }

    override get importeLiquidado() {
        return this.decimalImporteValorEntradaEfectivo
            .plus( this.importeCostoEntradaBienConsumo ?? 0 )
            .toNumber();
    }

    get dateTimeCompromiso(): DateTime
    {
        return Prop.toDateTime( this.fechaCompromiso );
    }

    
    constructor( item?: Partial<NotaVenta> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaVenta>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.salidasBienConsumo?.forEach( salida => 
            salida.set({
                documentoFuente: new NotaVenta({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            .setRelation()
        );

        this.salidasProduccionServicioReparacion?.forEach( salida => 
            salida.set({
                documentoFuente: new NotaVenta({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            .setRelation()
        );

        this.entradasEfectivo?.forEach( entrada => 
            entrada.set({
                documentoFuente: new NotaVenta({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            .setRelation()
        );

        return this;
    }


    override procesarInformacionEntrada(): this 
    {
        super.procesarInformacionEntrada();
        const prevImporteValorEntradaEfectivo = this.importeValorEntradaEfectivo;

        try {
            this.importeValorEntradaEfectivo = this.entradasEfectivo?.reduce(
                ( decimal, entrada ) => decimal.plus( entrada.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            )
            .plus( prevImporteValorEntradaEfectivo ?? 0 )
            .toNumber();
        }
        catch ( error ) {
            this.importeValorEntradaEfectivo = prevImporteValorEntradaEfectivo;
        }

        return this;
    }


    override procesarInformacionSalida(): this 
    {
        super.procesarInformacionSalida();

        const prevImporteCostoSalidaBienConsumo = this.importeCostoSalidaBienConsumo;
        const prevImportePrecioSalidaBienConsumo = this.importePrecioSalidaBienConsumo;
        
        try {
            const recordImportesSalidaBienConsumo = this.salidasBienConsumo?.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeCostoNeto: importes.importeCostoNeto.plus( salida.importeCostoNeto ?? 0 ),
                        importePrecioBruto: importes.importePrecioBruto.plus( salida.importePrecioBruto ?? 0 ),
                        importePrecioDescuento: importes.importePrecioDescuento.plus( salida.importePrecioDescuento ?? 0 ),
                        importePrecioNeto: importes.importePrecioNeto.plus( salida.importePrecioNeto ?? 0 )
                    };
                },
                {
                    importeCostoNeto: new Decimal( 0 ),
                    importePrecioBruto: new Decimal( 0 ),
                    importePrecioDescuento: new Decimal( 0 ),
                    importePrecioNeto: new Decimal( 0 )
                }
            );

            this.set({
                importeBruto: recordImportesSalidaBienConsumo?.importePrecioBruto.toNumber(),
                importeDescuento: recordImportesSalidaBienConsumo?.importePrecioDescuento.toNumber(),
                importeInicial: recordImportesSalidaBienConsumo?.importePrecioBruto.minus( recordImportesSalidaBienConsumo.importePrecioDescuento ).toNumber(),

                importeCostoSalidaBienConsumo: recordImportesSalidaBienConsumo?.importeCostoNeto.plus( prevImporteCostoSalidaBienConsumo ?? 0 ).toNumber(),
                importePrecioSalidaBienConsumo: recordImportesSalidaBienConsumo?.importePrecioBruto.minus( recordImportesSalidaBienConsumo.importePrecioDescuento )
                    .plus( prevImportePrecioSalidaBienConsumo ?? 0 )
                    .toNumber()
            })
        }
        catch ( error ) {
            this.set({
                importeBruto: 0,
                importeDescuento: 0,
                importeInicial: 0,

                importeCostoSalidaBienConsumo: prevImporteCostoSalidaBienConsumo,
                importePrecioSalidaBienConsumo: prevImportePrecioSalidaBienConsumo
            })
        }


        const prevImporteCostoSalidaProduccion = this.importeCostoSalidaProduccion;
        const prevImportePrecioSalidaProduccion = this.importePrecioSalidaProduccion;

        try {
            const recordImportesSalidaProduccion = this.salidasProduccionServicioReparacion?.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeCostoSalidaProduccion: importes.importeCostoSalidaProduccion.plus( salida.importeCostoNeto ?? 0 ),
                        importePrecioAdicional: importes.importePrecioAdicional.plus( salida.importePrecioNeto ?? 0 )
                    }
                },
                {
                    importeCostoSalidaProduccion: new Decimal( 0 ),
                    importePrecioAdicional: new Decimal( 0 )
                }
            )
            
            this.set({
                importeAdicional: recordImportesSalidaProduccion?.importePrecioAdicional.toNumber(),
                importeNeto: recordImportesSalidaProduccion?.importePrecioAdicional.plus( this.importeInicial ?? 0 ).toNumber(),

                importeCostoSalidaProduccion: recordImportesSalidaProduccion?.importeCostoSalidaProduccion.plus( prevImporteCostoSalidaProduccion ?? 0 ).toNumber(),
                importePrecioSalidaProduccion: recordImportesSalidaProduccion?.importePrecioAdicional.plus( prevImportePrecioSalidaProduccion ?? 0 ).toNumber()
            })
        }
        catch ( error ) {
            this.set({
                importeAdicional: 0,
                importeNeto: this.importeInicial,

                importeCostoSalidaProduccion: prevImporteCostoSalidaProduccion,
                importePrecioSalidaProduccion: prevImportePrecioSalidaProduccion
            })
        }

        
        return this;
    }


    // Salida Bien de Consumo
    agregarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this
    {
        this.salidasBienConsumo?.unshift( salidaBienConsumo );
        this.procesarInformacion();
        return this;
    }


    actualizarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this
    {
        if ( this.salidasBienConsumo ) {
            let i = this.salidasBienConsumo.findIndex( sal => sal.symbol === salidaBienConsumo.symbol );
    
            i = i === -1
                ? this.salidasBienConsumo.findIndex( sal => 
                    ( sal.id === undefined || salidaBienConsumo.id === undefined )
                        ? false
                        : ( sal.id === salidaBienConsumo.id )
                )
                : i;
    
            if ( i !== -1 ) {
                this.salidasBienConsumo[ i ] = salidaBienConsumo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): this
    {
        this.salidasBienConsumo = this.salidasBienConsumo?.filter( sal => sal.symbol !== salidaBienConsumo.symbol );
        this.salidasBienConsumo = this.salidasBienConsumo?.filter( sal => 
            ( sal.id === undefined || salidaBienConsumo.id === undefined )
                ? true
                : ( sal.id !== salidaBienConsumo.id )
        )

        this.procesarInformacion();

        return this;
    }


    getSalidaBienConsumo( salidaBienConsumo: NotaVentaSalidaBienConsumo ): NotaVentaSalidaBienConsumo | undefined
    {
        if ( !this.salidasBienConsumo ) return undefined;

        let i = this.salidasBienConsumo.findIndex( sal => sal.symbol === salidaBienConsumo.symbol );

        i = i === -1
            ? this.salidasBienConsumo.findIndex( sal => 
                ( sal.id === undefined || salidaBienConsumo.id === undefined )
                    ? false
                    : ( sal.id === salidaBienConsumo.id )
            )
            : i;

        return this.salidasBienConsumo[ i ];
    }


    // Salida Produccion de Servicio de Reparacion
    agregarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this
    {
        this.salidasProduccionServicioReparacion?.unshift( salidaProduccionServicioReparacion );
        this.procesarInformacion();
        return this;
    }


    actualizarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this
    {
        if ( this.salidasProduccionServicioReparacion ) {
            let i = this.salidasProduccionServicioReparacion.findIndex( sal => sal.symbol === salidaProduccionServicioReparacion.symbol );
    
            i = i === -1
                ? this.salidasProduccionServicioReparacion.findIndex( sal => 
                    ( sal.id === undefined || salidaProduccionServicioReparacion.id === undefined )
                        ? false
                        : ( sal.id === salidaProduccionServicioReparacion.id )
                )
                : i;
    
            if ( i !== -1 ) {
                this.salidasProduccionServicioReparacion[ i ] = salidaProduccionServicioReparacion;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): this
    {
        this.salidasProduccionServicioReparacion = this.salidasProduccionServicioReparacion?.filter( sal => sal.symbol !== salidaProduccionServicioReparacion.symbol );
        this.salidasProduccionServicioReparacion = this.salidasProduccionServicioReparacion?.filter( sal => 
            ( sal.id === undefined || salidaProduccionServicioReparacion.id === undefined )
                ? true
                : ( sal.id !== salidaProduccionServicioReparacion.id )
        )

        this.procesarInformacion();

        return this;
    }


    getSalidaProduccionServicioReparacion( salidaProduccionServicioReparacion: NotaVentaSalidaProduccionServicioReparacion ): NotaVentaSalidaProduccionServicioReparacion | undefined
    {
        if ( ! this.salidasProduccionServicioReparacion ) return undefined;

        let i = this.salidasProduccionServicioReparacion.findIndex( sal => sal.symbol === salidaProduccionServicioReparacion.symbol );

        i = i === -1
            ? this.salidasProduccionServicioReparacion.findIndex( sal => 
                ( sal.id === undefined || salidaProduccionServicioReparacion.id === undefined )
                    ? false
                    : ( sal.id === salidaProduccionServicioReparacion.id )
            )
            : i;

        return this.salidasProduccionServicioReparacion[ i ];
    }


    // Entrada de Efectivo
    agregarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this
    {
        this.entradasEfectivo?.unshift( entradaEfectivo );
        this.procesarInformacion();
        return this;
    }


    actualizarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this
    {
        if ( this.entradasEfectivo ) {
            let i = this.entradasEfectivo.findIndex( ent => ent.symbol === entradaEfectivo.symbol );
    
            i = i === -1
                ? this.entradasEfectivo.findIndex( ent => 
                    ( ent.id === undefined || entradaEfectivo.id === undefined )
                        ? false
                        : ( ent.id === entradaEfectivo.id )
                )
                : i;
    
            if ( i !== -1 ) {
                this.entradasEfectivo[ i ] = entradaEfectivo;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): this
    {
        this.entradasEfectivo = this.entradasEfectivo?.filter( ent => ent.symbol !== entradaEfectivo.symbol );
        this.entradasEfectivo = this.entradasEfectivo?.filter( ent => 
            ( ent.id === undefined || entradaEfectivo.id === undefined )
                ? true
                : ( ent.id !== entradaEfectivo.id )
        )

        this.procesarInformacion();

        return this;
    }


    getEntradaEfectivo( entradaEfectivo: NotaVentaEntradaEfectivo ): NotaVentaEntradaEfectivo | undefined
    {
        if ( !this.entradasEfectivo ) return undefined;

        let i = this.entradasEfectivo.findIndex( ent => ent.symbol === entradaEfectivo.symbol );

        i = i === -1
            ? this.entradasEfectivo.findIndex( ent => 
                ( ent.id === undefined || entradaEfectivo.id === undefined )
                    ? false
                    : ( ent.id === entradaEfectivo.id )
            )
            : i;

        return this.entradasEfectivo[ i ];
    }


    override toRecordKardexBienConsumo(record: Record<string, KardexBienConsumo> = {}): Record<string, KardexBienConsumo>
    {
        super.toRecordKardexBienConsumo(record);

        for ( const sal of this.salidasBienConsumo ?? [] ) {
            const almacenUuid = sal.almacen?.uuid
            const bienConsumoUuid = sal.bienConsumo?.uuid;
            if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;
            
            const clave = `${almacenUuid}|${bienConsumoUuid}`
            if ( !( clave in record ) ) {
                record[clave] = new KardexBienConsumo({
                    almacen: sal.almacen,
                    bienConsumo: sal.bienConsumo,
                    movimientos: []
                })
            }
            
            record[clave].movimientos?.push(new KardexMovimientoBienConsumo({
                movimientoUuid: sal.uuid,
                movimientoTipo: MovimientoTipoBienConsumo.SALIDA_NOTA_VENTA,
                fecha: this.fechaEmision,
                documentoFuenteCodigoSerie: this.codigoSerie,
                documentoFuenteCodigoNumero: this.codigoNumero,
                concepto: this.concepto,
                salidaCantidad: sal.cantidadSaliente
            }))
        }
        
        for ( const sal of this.salidasProduccionServicioReparacion ?? [] ) {
            for ( const recurso of sal.recursosBienConsumo ?? [] ) {
                const almacenUuid = recurso.almacen?.uuid
                const bienConsumoUuid = recurso.bienConsumo?.uuid;
                if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;
                
                const clave = `${almacenUuid}|${bienConsumoUuid}`
                if ( !( clave in record ) ) {
                    record[clave] = new KardexBienConsumo({
                        almacen: recurso.almacen,
                        bienConsumo: recurso.bienConsumo,
                        movimientos: []
                    })
                }
                
                record[clave].movimientos?.push(new KardexMovimientoBienConsumo({
                    movimientoUuid: recurso.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_NOTA_VENTA_SERVICIO_REPARACION_RECURSO,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: recurso.cantidad
                })) 
            }
        }

        return record;
    }
}