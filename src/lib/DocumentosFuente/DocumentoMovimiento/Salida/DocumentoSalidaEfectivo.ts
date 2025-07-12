import Decimal from 'decimal.js';
import { DocumentoSalida, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaEfectivo } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaEfectivo extends DocumentoSalida {

    static override type = ModelType.DocumentoSalidaEfectivo;
    override type = ModelType.DocumentoSalidaEfectivo;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => SalidaEfectivo.initialize( [x] )[0] } ) salidas?: SalidaEfectivo[];


    constructor( item?: OptionalModel<DocumentoSalidaEfectivo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoSalidaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoSalidaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoSalidaEfectivo.type, () => {

            this.salidas?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) )

        } );

        return this;
    }


    override procesarInformacion(): this {
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
    agregarSalida( salida: SalidaEfectivo ): this {
        this.salidas ??= [];
        this.salidas?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarSalida( salida: SalidaEfectivo ): this {
        if ( this.salidas ) {
            const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );

            if ( i !== -1 ) {
                this.salidas[i] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarSalida( salida: SalidaEfectivo ): this {
        this.salidas = this.salidas?.filter( sal => !sal.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getSalida( salida: SalidaEfectivo ): SalidaEfectivo | undefined {
        if ( !this.salidas ) return undefined;
        const i = this.salidas.findIndex( sal => sal.isSameIdentity( salida ) );
        return this.salidas[i];
    }
}