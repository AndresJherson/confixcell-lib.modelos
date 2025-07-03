import Decimal from 'decimal.js';
import { DocumentoSalida, KardexBienConsumo, KardexMovimientoBienConsumo, MovimientoTipoBienConsumo, Prop, PropBehavior, SalidaBienConsumo, SalidaBienConsumoValorEntrada, SalidaBienConsumoValorNuevo } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaBienConsumo extends DocumentoSalida {
    static override type: string = 'DocumentoSalidaBienConsumo';
    override type: string = DocumentoSalidaBienConsumo.type;

    @Prop.Set( PropBehavior.array, x => new SalidaBienConsumo( x ) ) salidas?: SalidaBienConsumo[];

    @Prop.Set() importeCostoNeto?: number;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<DocumentoSalidaBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<DocumentoSalidaBienConsumo> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.salidas?.forEach( salida =>
            salida.set( {
                documentoFuente: new DocumentoSalidaBienConsumo( { id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero } ),
            } )
                .setRelation()
        );

        return this;
    }


    override procesarInformacion(): this {
        super.procesarInformacion();

        try {
            const recordImportes = this.salidas?.reduce(
                ( importes, salida ) => {
                    salida.procesarInformacion();
                    return {
                        importeCostoNeto: importes.importeCostoNeto.plus( salida.importeCostoNeto ?? 0 ),
                        importeValorNeto: importes.importeValorNeto.plus( salida.importeValorNeto ?? 0 )
                    };
                },
                {
                    importeCostoNeto: new Decimal( 0 ),
                    importeValorNeto: new Decimal( 0 )
                }
            );

            
            this.set( {
                importeCostoNeto: recordImportes?.importeCostoNeto.toNumber(),
                importeNeto: recordImportes?.importeValorNeto.toNumber()
            } )
        }
        catch ( error ) {
            this.set( {
                importeCostoNeto: 0,
                importeNeto: 0
            } )
        }

        return this;
    }


    // Salida de Bien de Consumo
    agregarSalida( salida: SalidaBienConsumo ): this {
        this.salidas?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarSalida( salida: SalidaBienConsumo ): this {
        if ( this.salidas ) {
            const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );

            if ( i !== -1 ) {
                this.salidas[i] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalida( salida: SalidaBienConsumo ): this {
        this.salidas = this.salidas?.filter( sal => !sal.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getSalida( salida: SalidaBienConsumo ): SalidaBienConsumo | undefined {
        if ( !this.salidas ) return undefined

        const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
        return this.salidas[i];
    }


    override toRecordKardexBienConsumo( record: Record<string, KardexBienConsumo> = {} ): Record<string, KardexBienConsumo> {
        for ( const sal of this.salidas ?? [] ) {
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

            if ( sal instanceof SalidaBienConsumoValorNuevo ) {
                record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                    uuid: sal.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_VALOR_NUEVO,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: sal.cantidadSaliente
                } ) )
            }
            else if ( sal instanceof SalidaBienConsumoValorEntrada ) {
                record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                    uuid: sal.uuid,
                    referenciaUuid: sal.entrada?.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.SALIDA_VALOR_ENTRADA,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    salidaCantidad: sal.cantidadSaliente
                } ) )
            }
        }

        return record;
    }
}