import Decimal from 'decimal.js';
import { DocumentoEntrada, EntradaEfectivo, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class DocumentoEntradaEfectivo extends DocumentoEntrada {

    static override type = ModelType.DocumentoEntradaEfectivo;
    override type = ModelType.DocumentoEntradaEfectivo;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => EntradaEfectivo.initialize( [x] )[0] } ) entradas?: EntradaEfectivo[];


    constructor( item?: OptionalModel<DocumentoEntradaEfectivo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoEntradaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoEntradaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoEntradaEfectivo.type, () => {

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


    // Entrada de Efectivo
    agregarEntrada( entrada: EntradaEfectivo ): this {
        this.entradas ??= [];
        this.entradas?.unshift( entrada );
        this.procesarInformacion();
        return this;
    }


    actualizarEntrada( entrada: EntradaEfectivo ): this {
        if ( this.entradas ) {
            const i = this.entradas.findIndex( ent => ent.isSameIdentity( entrada ) );

            if ( i !== -1 ) {
                this.entradas[i] = entrada;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarEntrada( entrada: EntradaEfectivo ): this {
        this.entradas = this.entradas?.filter( ent => !ent.isSameIdentity( entrada ) );
        this.procesarInformacion();
        return this;
    }


    getEntrada( entrada: EntradaEfectivo ) {
        if ( !this.entradas ) return undefined;
        const i = this.entradas.findIndex( ent => ent.isSameIdentity( entrada ) );
        return this.entradas[i];
    }
}