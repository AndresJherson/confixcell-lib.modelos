import Decimal from 'decimal.js';
import { DocumentoSalida, Prop, PropBehavior, SalidaEfectivo } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaEfectivo extends DocumentoSalida
{
    static override type: string = 'DocumentoSalidaEfectivo';
    override type: string = DocumentoSalidaEfectivo.type;

    @Prop.Set( PropBehavior.array, x => new SalidaEfectivo( x ) ) salidas?: SalidaEfectivo[];

    
    constructor( item?: Partial<DocumentoSalidaEfectivo> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<DocumentoSalidaEfectivo>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.salidas?.forEach( salida => 
            salida.set({
                documentoFuente: new DocumentoSalidaEfectivo({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
            })
            .setRelation()
        );

        return this;
    }


    override procesarInformacion(): this
    {
        super.procesarInformacion();
        
        try {
            this.importeNeto = this.salidas?.reduce(
                ( decimal, salida ) => decimal.plus( salida.procesarInformacion().importeValorNeto ?? 0 ),
                new Decimal( 0 )
            )
            .toNumber();
        }
        catch ( error ) {
            this.importeNeto = 0;
        }

        return this;
    }


    // Salida de Efectivo
    agregarSalida( salida: SalidaEfectivo ): this
    {
        this.salidas?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarSalida( salida: SalidaEfectivo ): this
    {
        if ( this.salidas ) {
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
        }

        return this;
    }


    eliminarSalida( salida: SalidaEfectivo ): this
    {
        this.salidas = this.salidas?.filter( sal => sal.symbol !== salida.symbol );
        this.salidas = this.salidas?.filter( sal => 
            ( sal.id === undefined || salida.id === undefined )
                ? true
                : ( sal.id !== salida.id )
        )

        this.procesarInformacion();

        return this;
    }


    getSalida( salida: SalidaEfectivo ): SalidaEfectivo | undefined
    {
        if ( !this.salidas ) return undefined;

        let i = this.salidas.findIndex( sal => sal.symbol === salida.symbol );

        i = i === -1
            ? this.salidas.findIndex( sal => 
                ( sal.id === undefined || salida.id === undefined )
                    ? false
                    : ( sal.id === salida.id )
            )
            : i;

        return this.salidas[ i ];
    }
}