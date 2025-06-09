import Decimal from 'decimal.js';
import { Cliente, DocumentoIdentificacion, DocumentoTransaccion, LiquidacionTipo, NotaTransaccionSalidaCredito, NotaTransaccionSalidaDetalle, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class NotaTransaccionSalida extends DocumentoTransaccion
{
    static override type: string = 'NotaTransaccionSalida';
    override type: string = NotaTransaccionSalida.type;

    @Prop.Set( PropBehavior.model, x => new Cliente( x ) ) cliente?: Cliente;
    @Prop.Set( PropBehavior.model, x => new DocumentoIdentificacion( x ) ) clienteDocumentoIdentificacion?: DocumentoIdentificacion;
    @Prop.Set() clienteCodigo?: string;
    @Prop.Set() clienteNombre?: string;
    @Prop.Set() clienteCelular?: number;
    @Prop.Set( PropBehavior.model, x => new LiquidacionTipo( x ) ) liquidacion?: LiquidacionTipo;

    @Prop.Set( PropBehavior.array, x => new NotaTransaccionSalidaDetalle( x ) ) detalles?: NotaTransaccionSalidaDetalle[];
    @Prop.Set( PropBehavior.model, x => new NotaTransaccionSalidaCredito ) credito?: NotaTransaccionSalidaCredito;

    @Prop.Set() override importeBruto?: number;
    @Prop.Set() importeDescuento?: number;
    @Prop.Set() override importeNeto?: number;
    get decimalImportePrecioDescuento(): Decimal {
        return Prop.toDecimal( this.importeDescuento );
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


    constructor( item?: Partial<NotaTransaccionSalida> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaTransaccionSalida>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.detalles?.forEach( detalle => 
            detalle.set({
                notaTransaccionSalida: new NotaTransaccionSalida({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
            })
            .setRelation()
        )

        this.credito?.set({
            documentoFuente: new NotaTransaccionSalida({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero })
        });
        

        return this;
    }


    // Detalles
    agregarDetalle( detalle: NotaTransaccionSalidaDetalle ): this
    {
        this.detalles?.push( detalle );
        this.procesarInformacion();
        return this;
    }


    actualizarDetalle( detalle: NotaTransaccionSalidaDetalle ): this
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


    eliminarDetalle( detalle: NotaTransaccionSalidaDetalle ): this
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


    getDetalle( detalle: NotaTransaccionSalidaDetalle ): NotaTransaccionSalidaDetalle | undefined
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

        return this.detalles[ i ];
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