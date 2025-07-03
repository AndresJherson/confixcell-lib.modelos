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
            const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
    
            if ( i !== -1 ) {
                this.salidas[ i ] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalida( salida: SalidaEfectivo ): this
    {
        this.salidas = this.salidas?.filter( sal => !sal.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getSalida( salida: SalidaEfectivo ): SalidaEfectivo | undefined
    {
        if ( !this.salidas ) return undefined;
        const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
        return this.salidas[ i ];
    }
}