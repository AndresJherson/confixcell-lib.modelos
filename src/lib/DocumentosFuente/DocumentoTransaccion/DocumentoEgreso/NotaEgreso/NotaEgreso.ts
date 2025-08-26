import Decimal from 'decimal.js';
import { Cast, ComprobanteTipo, DocumentoIdentificacion, DocumentoTransaccion, ExecutionContext, LiquidacionTipo, ModelType, NotaEgresoCredito, NotaEgresoDetalle, OptionalModel, Persona, Prop, PropBehavior } from '../../../../../index';

@Prop.Class()
export class NotaEgreso extends DocumentoTransaccion {

    static override type: string = ModelType.NotaEgreso;
    override type: string = ModelType.NotaEgreso;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new ComprobanteTipo( x ) } ) comprobanteTipo?: ComprobanteTipo | null;
    @Prop.Set() comprobanteCodigoSerie?: string | null;
    @Prop.Set() comprobanteCodigoNumero?: number | null;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Persona.initialize( [x] )[0] } ) proveedor?: Persona | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new DocumentoIdentificacion( x ) } ) proveedorDocumentoIdentificacion?: DocumentoIdentificacion | null;
    @Prop.Set() proveedorCodigo?: string | null;
    @Prop.Set() proveedorNombre?: string | null;
    @Prop.Set() proveedorCelular?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new LiquidacionTipo( x ) } ) liquidacion?: LiquidacionTipo | null;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaEgresoDetalle( x ) } ) detalles?: NotaEgresoDetalle[] | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaEgresoCredito( x ) } ) credito?: NotaEgresoCredito | null;

    @Prop.Set() override importeBruto?: number | null;
    @Prop.Set() importeDescuento?: number | null;
    get decimalImporteDescuento(): Decimal { return Cast.toDecimal( this.importeDescuento ); }


    override get importeDevengado() {
        return this.decimalImporteValorEntradaEfectivo
            .plus( this.importeValorEntradaBienConsumo ?? 0 )
            .toNumber();
    }

    override get importeLiquidado() {
        return this.decimalImporteValorSalidaEfectivo
            .plus( this.importeValorSalidaBienConsumo ?? 0 )
            .plus( this.importeValorSalidaProduccion ?? 0 )
            .toNumber();
    }


    constructor( item?: OptionalModel<NotaEgreso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaEgreso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaEgreso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaEgreso.type, () => {

            this.comprobanteTipo?.setRelation( context );

            this.proveedor?.setRelation( context );

            this.proveedorDocumentoIdentificacion?.setRelation( context );

            this.liquidacion?.setRelation( context );

            this.detalles?.forEach( item => item.assign( {
                notaEgreso: this
            } ).setRelation( context ) )

            this.credito?.assign( {
                documentoFuente: this
            } ).setRelation( context );

        } );

        return this;
    }


    // Detalles
    agregarDetalle( detalle: NotaEgresoDetalle ): this {
        this.detalles ??= [];
        this.detalles?.push( detalle );
        this.procesarInformacion();
        return this;
    }


    actualizarDetalle( detalle: NotaEgresoDetalle ): this {
        if ( this.detalles ) {
            const i = this.detalles.findIndex( x => x.isSameIdentity( detalle ) );

            if ( i !== -1 ) {
                this.detalles[i] = detalle;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDetalle( detalle: NotaEgresoDetalle ): this {
        this.detalles = this.detalles?.filter( x => !x.isSameIdentity( detalle ) );
        this.procesarInformacion();
        return this;
    }


    getDetalle( detalle: NotaEgresoDetalle ): NotaEgresoDetalle | undefined {
        if ( !this.detalles ) return undefined;
        const i = this.detalles.findIndex( x => x.isSameIdentity( detalle ) );
        return this.detalles[i];
    }


    override procesarInformacion(): this {
        super.procesarInformacion();

        try {
            const recordImportes = this.detalles?.reduce(
                ( importes, detalle ) => {
                    detalle.procesarInformacion();
                    return {
                        importeBruto: importes.importeBruto.plus( detalle.importeBruto ?? 0 ),
                        importeDescuento: importes.importeDescuento.plus( detalle.importeDescuento ?? 0 )
                    };
                },
                {
                    importeBruto: new Decimal( 0 ),
                    importeDescuento: new Decimal( 0 )
                }
            );

            this.set( {
                importeBruto: recordImportes?.importeBruto.toNumber(),
                importeDescuento: recordImportes?.importeDescuento.toNumber(),
                importeNeto: recordImportes?.importeBruto.minus( recordImportes.importeDescuento ).toNumber()
            } );
        }
        catch ( error ) {
            this.set( {
                importeBruto: 0,
                importeDescuento: 0,
                importeNeto: 0
            } );
        }

        return this;
    }

}