import Decimal from 'decimal.js';
import { DocumentoEntrada, EntradaBienConsumo, EntradaBienConsumoValorNuevo, EntradaBienConsumoValorSalida, ExecutionContext, KardexBienConsumo, KardexMovimientoBienConsumo, ModelType, MovimientoTipoBienConsumo, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class DocumentoEntradaBienConsumo extends DocumentoEntrada {

    static override type = ModelType.DocumentoEntradaBienConsumo;
    override type = ModelType.DocumentoEntradaBienConsumo;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => EntradaBienConsumo.initialize( [x] ) } ) entradas?: EntradaBienConsumo[];


    constructor( item?: OptionalModel<DocumentoEntradaBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoEntradaBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoEntradaBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoEntradaBienConsumo.type, () => {

            this.entradas?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) )

        } );

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
        this.entradas ??= [];
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


    getEntrada( entrada: EntradaBienConsumo ): EntradaBienConsumo | undefined {
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