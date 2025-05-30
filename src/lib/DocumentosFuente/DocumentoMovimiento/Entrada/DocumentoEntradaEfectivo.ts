import Decimal from 'decimal.js';
import { DocumentoEntrada, EntradaEfectivo, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class DocumentoEntradaEfectivo extends DocumentoEntrada
{
    static override type: string = 'DocumentoEntradaEfectivo';
    override type: string = DocumentoEntradaEfectivo.type;

    @Prop.Set( PropBehavior.array, x => new EntradaEfectivo( x ) ) entradas: EntradaEfectivo[] = [];
    

    constructor( item?: Partial<DocumentoEntradaEfectivo> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<DocumentoEntradaEfectivo>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: 
        Parameters<DocumentoEntrada['setRelation']>[0] & 
        Parameters<EntradaEfectivo['setRelation']>[0]
    ): this 
    {
        super.setRelation( keys );

        this.entradas.forEach( entrada => entrada.setRelation( keys ).set({
            documentoFuente: new DocumentoEntradaEfectivo({ id: this.id, uuid: this.uuid, symbol: this.symbol, codigoSerie: this.codigoSerie, codigoNumero: this.codigoNumero }),
        }) );

        return this;
    }


    override procesarInformacion(): this 
    {
        super.procesarInformacion();
        
        try {
            this.importeNeto = this.entradas.reduce(
                ( decimal, entrada ) => decimal.plus( entrada.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            )
            .toNumber();
        }
        catch ( error ) {
            this.importeNeto = 0;
        }

        return this;
    }


    // Entrada de Efectivo
    agregarEntrada( entrada: EntradaEfectivo ): this
    {
        this.entradas.unshift( entrada );
        this.procesarInformacion();
        return this;
    }


    actualizarEntrada( entrada: EntradaEfectivo ): this
    {
        let i = this.entradas.findIndex( ent => ent.symbol === entrada.symbol );

        i = i === -1
            ? this.entradas.findIndex( ent => 
                ( ent.id === undefined || entrada.id === undefined )
                    ? false
                    : ( ent.id === entrada.id )
            )
            : i;

        if ( i !== -1 ) {
            this.entradas[ i ] = entrada;
            this.procesarInformacion();
        }

        return this;
    }


    eliminarEntrada( entrada: EntradaEfectivo ): this
    {
        this.entradas = this.entradas.filter( ent => ent.symbol !== entrada.symbol );
        this.entradas = this.entradas.filter( ent => 
            ( ent.id === undefined || entrada.id === undefined )
                ? true
                : ( ent.id !== entrada.id )
        )

        this.procesarInformacion();

        return this;
    }


    getEntrada( entrada: EntradaEfectivo ): EntradaEfectivo
    {
        let i = this.entradas.findIndex( ent => ent.symbol === entrada.symbol );

        i = i === -1
            ? this.entradas.findIndex( ent => 
                ( ent.id === undefined || entrada.id === undefined )
                    ? false
                    : ( ent.id === entrada.id )
            )
            : i;

        if ( i !== -1 ) {
            return this.entradas[ i ];
        }
        else {
            throw new Error( 'Entrada de Efectivo no existe' );
        }
    }
}