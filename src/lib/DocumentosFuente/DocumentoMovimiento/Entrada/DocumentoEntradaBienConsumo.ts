import Decimal from 'decimal.js';
import { DocumentoEntrada, EntradaBienConsumo, EntradaBienConsumoValorNuevo, EntradaBienConsumoValorSalida, KardexBienConsumo, KardexMovimientoBienConsumo, MovimientoTipoBienConsumo, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class DocumentoEntradaBienConsumo extends DocumentoEntrada {
    static override type: string = 'DocumentoEntradaBienConsumo';
    override type: string = DocumentoEntradaBienConsumo.type;

    @Prop.Set( PropBehavior.array, x => new EntradaBienConsumo( x ) ) entradas?: EntradaBienConsumo[];


    constructor( item?: Partial<DocumentoEntradaBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<DocumentoEntradaBienConsumo> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.entradas?.forEach( entrada =>
            entrada.set( {
                documentoFuente: new DocumentoEntradaBienConsumo( { id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero } ),
            } )
                .setRelation()
        );

        return this;
    }


    override procesarInformacion(): this {
        super.procesarInformacion();

        try {
            this.importeNeto = this.entradas?.reduce(
                ( decimal, entrada ) => decimal.plus( entrada.procesarInformacion().importeValorNeto ?? 0 ),
                new Decimal( 0 )
            )
                .toNumber();
        }
        catch ( error ) {
            this.importeNeto = 0;
        }

        return this;
    }


    // Entrada de Bien de Consumo
    agregarEntrada( entrada: EntradaBienConsumo ): this {
        this.entradas?.unshift( entrada );
        this.procesarInformacion();
        return this;
    }


    actualizarEntrada( entrada: EntradaBienConsumo ): this {
        if ( this.entradas ) {
            const i = this.entradas.findIndex( ent => ent.isSameIdentity( entrada ) )

            if ( i !== -1 ) {
                this.entradas[i] = entrada;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarEntrada( entrada: EntradaBienConsumo ): this {
        this.entradas = this.entradas?.filter( ent => !ent.isSameIdentity( entrada ) )
        this.procesarInformacion();
        return this;
    }


    getEntrada( entrada: EntradaBienConsumo ) {
        if ( !this.entradas ) return undefined;
        const i = this.entradas.findIndex( ent => ent.isSameIdentity( entrada ) )
        return this.entradas[i];
    }


    override toRecordKardexBienConsumo( record: Record<string, KardexBienConsumo> = {} ): Record<string, KardexBienConsumo> {
        for ( const ent of this.entradas ?? [] ) {
            const almacenUuid = ent.almacen?.uuid
            const bienConsumoUuid = ent.bienConsumo?.uuid;
            if ( almacenUuid === undefined || bienConsumoUuid === undefined ) continue;

            const clave = `${almacenUuid}|${bienConsumoUuid}`
            if ( !( clave in record ) ) {
                record[clave] = new KardexBienConsumo( {
                    almacen: ent.almacen,
                    bienConsumo: ent.bienConsumo,
                    movimientos: []
                } )
            }

            if ( ent instanceof EntradaBienConsumoValorNuevo ) {
                record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                    uuid: ent.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.ENTRADA_VALOR_NUEVO,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    entradaCantidad: ent.cantidadEntrante,
                    entradaCostoUnitario: ent.importeValorUnitario,
                    entradaCostoTotal: ent.importeValorNeto
                } ) )
            }
            else if ( ent instanceof EntradaBienConsumoValorSalida ) {
                record[clave].movimientos?.push( new KardexMovimientoBienConsumo( {
                    uuid: ent.uuid,
                    referenciaUuid: ent.salida?.uuid,
                    movimientoTipo: MovimientoTipoBienConsumo.ENTRADA_VALOR_SALIDA,
                    fecha: this.fechaEmision,
                    documentoFuenteCodigoSerie: this.codigoSerie,
                    documentoFuenteCodigoNumero: this.codigoNumero,
                    concepto: this.concepto,
                    entradaCantidad: ent.cantidadEntrante
                } ) )
            }
        }

        return record;
    }
}