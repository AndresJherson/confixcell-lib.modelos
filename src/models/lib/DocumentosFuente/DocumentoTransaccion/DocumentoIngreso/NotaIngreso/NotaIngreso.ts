import Decimal from 'decimal.js';
import { Cast, DocumentoIdentificacion, DocumentoTransaccion, ExecutionContext, LiquidacionTipo, ModelType, NotaIngresoCredito, NotaIngresoDetalle, OptionalModel, Persona, Prop, PropBehavior } from '../../../../../index';

@Prop.Class()
export class NotaIngreso extends DocumentoTransaccion {

    static override type = 'NotaIngreso';
    override type = 'NotaIngreso';
    private __NotaIngreso!: 'NotaIngreso';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Persona.initialize( [x] )[0] } ) cliente?: Persona | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new DocumentoIdentificacion( x ) } ) clienteDocumentoIdentificacion?: DocumentoIdentificacion | null;
    @Prop.Set() clienteCodigo?: string | null;
    @Prop.Set() clienteNombre?: string | null;
    @Prop.Set() clienteCelular?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new LiquidacionTipo( x ) } ) liquidacion?: LiquidacionTipo | null;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaIngresoDetalle( x ) } ) detalles?: NotaIngresoDetalle[] | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaIngresoCredito( x ) } ) credito?: NotaIngresoCredito | null;

    @Prop.Set() override importeBruto?: number | null;
    @Prop.Set() importeDescuento?: number | null;
    @Prop.Set() override importeNeto?: number | null;
    get decimalImportePrecioDescuento(): Decimal { return Cast.toDecimal( this.importeDescuento ); }


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


    constructor( item?: OptionalModel<NotaIngreso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaIngreso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaIngreso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaIngreso.type, () => {

            this.cliente?.setRelation( context );

            this.clienteDocumentoIdentificacion?.setRelation( context );

            this.liquidacion?.setRelation( context );

            this.detalles?.forEach( item => item.assign( {
                notaIngreso: this
            } ).setRelation( context ) );

            this.credito?.assign( {
                documentoFuente: this
            } ).setRelation( context )

        } );

        return this;
    }


    // Detalles
    agregarDetalle( detalle: NotaIngresoDetalle ): this {
        this.detalles ??= [];
        this.detalles?.push( detalle );
        this.procesarInformacion();
        return this;
    }


    actualizarDetalle( detalle: NotaIngresoDetalle ): this {
        if ( this.detalles ) {
            const i = this.detalles.findIndex( x => x.isSameIdentity( detalle ) );

            if ( i !== -1 ) {
                this.detalles[i] = detalle;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDetalle( detalle: NotaIngresoDetalle ): this {
        this.detalles = this.detalles?.filter( x => !x.isSameIdentity( detalle ) );
        this.procesarInformacion();
        return this;
    }


    getDetalle( detalle: NotaIngresoDetalle ): NotaIngresoDetalle | undefined {
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