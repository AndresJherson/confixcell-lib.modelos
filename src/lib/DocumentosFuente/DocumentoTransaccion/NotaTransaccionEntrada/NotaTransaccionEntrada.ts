import Decimal from 'decimal.js';
import { ComprobanteTipo, DocumentoIdentificacion, DocumentoTransaccion, LiquidacionTipo, NotaTransaccionEntradaCredito, NotaTransaccionEntradaDetalle, Persona, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaTransaccionEntrada extends DocumentoTransaccion
{
    static override type: string = 'NotaTransaccionEntrada';
    override type: string = NotaTransaccionEntrada.type;

    @Prop.Set( PropBehavior.model, x => new ComprobanteTipo( x ) ) comprobanteTipo?: ComprobanteTipo;
    @Prop.Set() comprobanteCodigoSerie?: string;
    @Prop.Set() comprobanteCodigoNumero?: number;

    @Prop.Set( PropBehavior.model, x => new Persona( x ) ) proveedor?: Persona;
    @Prop.Set( PropBehavior.model, x => new DocumentoIdentificacion( x ) ) proveedorDocumentoIdentificacion?: DocumentoIdentificacion;
    @Prop.Set() proveedorCodigo?: string;
    @Prop.Set() proveedorNombre?: string;
    @Prop.Set() proveedorCelular?: number;
    @Prop.Set( PropBehavior.model, x => new LiquidacionTipo( x ) ) liquidacion?: LiquidacionTipo;

    @Prop.Set( PropBehavior.array, x => new NotaTransaccionEntradaDetalle( x ) ) detalles?: NotaTransaccionEntradaDetalle[];
    @Prop.Set( PropBehavior.model, x => new NotaTransaccionEntradaCredito( x ) ) credito?: NotaTransaccionEntradaCredito;

    @Prop.Set() override importeBruto?: number;
    @Prop.Set() importeDescuento?: number;
    get decimalImporteDescuento(): Decimal {
        return Prop.toDecimal( this.importeDescuento );
    }


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


    constructor( item?: Partial<NotaTransaccionEntrada> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaTransaccionEntrada>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.detalles?.forEach( detalle => 
            detalle.set({
                notaTransaccionEntrada: new NotaTransaccionEntrada({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            .setRelation()
        )

        this.credito?.set({
            documentoFuente: new NotaTransaccionEntrada({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
        });

        
        return this;
    }


    // Detalles
    agregarDetalle( detalle: NotaTransaccionEntradaDetalle ): this
    {
        this.detalles?.push( detalle );
        this.procesarInformacion();
        return this;
    }


    actualizarDetalle( detalle: NotaTransaccionEntradaDetalle ): this
    {
        if ( this.detalles ) {
            let i = this.detalles.findIndex( x => x.symbol === detalle.symbol );
    
            i = i === -1
                ? this.detalles.findIndex( x => 
                    ( x.id === undefined || detalle.id === undefined )
                        ? false
                        : ( x.id === detalle.id )
                )
                : i;
    
            if ( i !== -1 ) {
                this.detalles[ i ] = detalle;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarDetalle( detalle: NotaTransaccionEntradaDetalle ): this
    {
        this.detalles = this.detalles?.filter( x => x.symbol !== detalle.symbol );
        this.detalles = this.detalles?.filter( x => 
            ( x.id === undefined || detalle.id === undefined )
                ? true
                : ( x.id !== detalle.id )
        );

        this.procesarInformacion();

        return this;
    }


    getDetalle( detalle: NotaTransaccionEntradaDetalle ): NotaTransaccionEntradaDetalle | undefined
    {
        if ( !this.detalles ) return undefined;

        let i = this.detalles.findIndex( x => x.symbol === detalle.symbol );

        i = i === -1
            ? this.detalles.findIndex( x => 
                ( x.id === undefined || detalle.id === undefined )
                    ? false
                    : ( x.id === detalle.id )
            )
            : i;

        if ( i !== -1 ) {
            return this.detalles[ i ];
        }
        else {
            throw new Error( 'Detalle no existe' );
        }
    }


    override procesarInformacion(): this 
    {
        super.procesarInformacion();

        try {
            const recordImportes = this.detalles?.reduce(
                ( importes, detalle ) => {
                    detalle.procesarInformacion();
                    importes.importeBruto.plus( detalle.importeBruto ?? 0 );
                    importes.importeDescuento.plus( detalle.importeDescuento ?? 0 );
                    return importes;
                },
                {
                    importeBruto: new Decimal( 0 ),
                    importeDescuento: new Decimal( 0 )
                }
            );

            this.set({
                importeBruto: recordImportes?.importeBruto.toNumber(),
                importeDescuento: recordImportes?.importeDescuento.toNumber(),
                importeNeto: recordImportes?.importeBruto.minus( recordImportes.importeDescuento ).toNumber()
            });
        }
        catch ( error ) {
            this.set({
                importeBruto: 0,
                importeDescuento: 0,
                importeNeto: 0
            });
        }

        return this;
    }

}