import Decimal from 'decimal.js';
import { DocumentoSalida, Prop, PropBehavior, SalidaProduccion } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaProduccion extends DocumentoSalida
{
    static override type: string = 'DocumentoSalidaProduccion';
    override type: string = DocumentoSalidaProduccion.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccion( x ) ) salidas: SalidaProduccion[] = [];
    
    @Prop.Set() importeValorNeto: number = 0;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }
    

    constructor( item?: Partial<DocumentoSalidaProduccion> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<DocumentoSalidaProduccion>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: 
        Parameters<DocumentoSalida['setRelation']>[0] & 
        Parameters<SalidaProduccion['setRelation']>[0]
    ): this 
    {
        super.setRelation( keys );

        this.salidas.forEach( salida => salida.setRelation( keys ).set({
            documentoFuente: new DocumentoSalidaProduccion({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
        }) );

        return this;
    }


    override procesarInformacion(): this
    {
        super.procesarInformacion();
        
        try {
            const recordImpotes = this.salidas.reduce(
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
                importeValorNeto: recordImpotes.importeValorNeto.toNumber(),
                importeNeto: recordImpotes.importePrecioNeto.toNumber()
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


    // Salida de Efectivo
    agregarWrapper( salida: SalidaProduccion ): this
    {
        this.salidas.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarWrapper( salida: SalidaProduccion ): this
    {
        let i = this.salidas.findIndex( sal => sal.symbol === salida.symbol );

        i = i === -1
            ? this.salidas.findIndex( sal => 
                ( sal.id === undefined || salida.id === undefined )
                    ? false
                    : ( sal.id === salida.id  )
            )
            : i;

        if ( i !== -1 ) {
            this.salidas[ i ] = salida;
            this.procesarInformacion();
        }

        return this;
    }


    eliminarWrapper( salida: SalidaProduccion ): this
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


    getWrapper( salida: SalidaProduccion ): SalidaProduccion
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
}