import Decimal from 'decimal.js';
import { DocumentoSalida, Prop, PropBehavior, SalidaProduccion } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaProduccion extends DocumentoSalida {
    static override type: string = 'DocumentoSalidaProduccion';
    override type: string = DocumentoSalidaProduccion.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccion( x ) ) salidas?: SalidaProduccion[];

    @Prop.Set() importeCostoNeto?: number;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }



    constructor( item?: Partial<DocumentoSalidaProduccion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<DocumentoSalidaProduccion> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.salidas?.forEach( salida =>
            salida.set( {
                documentoFuente: new DocumentoSalidaProduccion( { id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero } ),
            } )
                .setRelation()
        );

        return this;
    }


    override procesarInformacion(): this {
        super.procesarInformacion();

        try {
            const recordImpotes = this.salidas?.reduce(
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
                importeCostoNeto: recordImpotes?.importeCostoNeto.toNumber(),
                importeNeto: recordImpotes?.importeValorNeto.toNumber()
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


    // Salida de Producción
    agregarSalida( salida: SalidaProduccion ): this {
        this.salidas?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarSalida( salida: SalidaProduccion ): this {
        if ( this.salidas ) {
            const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
            if ( i !== -1 ) {
                this.salidas[i] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalida( salida: SalidaProduccion ): this {
        this.salidas = this.salidas?.filter( sal => !sal.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getSalida( salida: SalidaProduccion ): SalidaProduccion | undefined {
        if ( !this.salidas ) return undefined;
        const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
        return this.salidas[i];
    }
}