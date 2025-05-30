import Decimal from 'decimal.js';
import { DocumentoSalida, KardexBienConsumo, KardexMovimientoBienConsumo, MovimientoTipoBienConsumo, Prop, PropBehavior, SalidaBienConsumo, SalidaBienConsumoValorEntrada, SalidaBienConsumoValorNuevo } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaBienConsumo extends DocumentoSalida
{
    static override type: string = 'DocumentoSalidaBienConsumo';
    override type: string = DocumentoSalidaBienConsumo.type;

    @Prop.Set( PropBehavior.array, x => new SalidaBienConsumo( x ) ) salidas: SalidaBienConsumo[] = [];

    @Prop.Set() importeValorNeto: number = 0;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }

    constructor( item?: Partial<DocumentoSalidaBienConsumo> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<DocumentoSalidaBienConsumo>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: 
        Parameters<DocumentoSalida['setRelation']>[0] & 
        Parameters<SalidaBienConsumo['setRelation']>[0]
    ): this 
    {
        super.setRelation( keys );

        this.salidas.forEach( salida => salida.setRelation( keys ).set({
            documentoFuente: new DocumentoSalidaBienConsumo({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
        }) );

        return this;
    }


    override procesarInformacion(): this
    {
        super.procesarInformacion();
        
        try {
            const recordImportes = this.salidas.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeValorNeto: importes.importeValorNeto.plus( salida.importeValorNeto ),
                        importePrecioNeto: importes.importePrecioNeto.plus( salida.importePrecioNeto )
                    };
                },
                {
                    importeValorNeto: new Decimal( 0 ),
                    importePrecioNeto: new Decimal( 0 )
                }
            );

            this.set({
                importeValorNeto: recordImportes.importeValorNeto.toNumber(),
                importeNeto: recordImportes.importePrecioNeto.toNumber()
            })
        }
        catch ( error ) {
            this.set({
                importeValorNeto: 0,
                importeNeto: 0
            })
        }

        return this;
    }


    // Salida de Bien de Consumo
    agregarSalida( salida: SalidaBienConsumo ): this
    {
        this.salidas.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarSalida( salida: SalidaBienConsumo ): this
    {
        let i = this.salidas.findIndex( sal => sal.symbol === salida.symbol );

        i = i === -1
            ? this.salidas.findIndex( sal => 
                ( sal.id === undefined || salida.id === undefined )
                    ? false
                    : ( sal.id === salida.id )
            )
            : i;

        if ( i !== -1 ) {
            this.salidas[ i ] = salida;
            this.procesarInformacion();
        }

        return this;
    }


    eliminarSalida( salida: SalidaBienConsumo ): this
    {
        this.salidas = this.salidas.filter( sal => sal.symbol !== salida.symbol );
        this.salidas = this.salidas.filter( sal => 
            ( sal.id === undefined || salida.id === undefined )
                ? true
                : ( sal.id !== salida.id )
        )

        this.procesarInformacion();

        return this;
    }


    getSalida( salida: SalidaBienConsumo ): SalidaBienConsumo
    {
        let i = this.salidas.findIndex( sal => sal.symbol === salida.symbol );

        i = i === -1
            ? this.salidas.findIndex( sal => 
                ( sal.id === undefined || salida.id === undefined )
                    ? false
                    : ( sal.id === salida.id )
            )
            : i;

        if ( i !== -1 ) {
            return this.salidas[ i ];
        }
        else {
            throw new Error( 'Salida de Bien de Consumo no existe' );
        }
    }


    override toRecordKardexBienConsumo(record: Record<string, KardexBienConsumo>): Record<string, KardexBienConsumo>
    {
        for ( const sal of this.salidas ) {
            const almacenUuid = sal.almacen?.uuid
            const bienConsumoUuid = sal.bienConsumo?.uuid;
            if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;
            
            const clave = `${almacenUuid}|${bienConsumoUuid}`
            if ( !( clave in record ) ) {
                record[clave] = new KardexBienConsumo({
                    almacen: sal.almacen,
                    bienConsumo: sal.bienConsumo
                })
            }
            
            if ( sal instanceof SalidaBienConsumoValorNuevo ) {
                record[clave].movimientos.push(new KardexMovimientoBienConsumo({
                    movimientoUuid: sal.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_VALOR_NUEVO,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: sal.cantidadSaliente
                }))
            }
            else if ( sal instanceof SalidaBienConsumoValorEntrada ) {
                record[clave].movimientos.push(new KardexMovimientoBienConsumo({
                    movimientoUuid: sal.uuid,
                    movimientoRefUuid: sal.entrada?.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_VALOR_ENTRADA,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: sal.cantidadSaliente
                }))
            }   
        }
        
        return record;
    }
}