import Decimal from 'decimal.js';
import { Cast, DocumentoSalida, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccion } from '../../../../index';

@Prop.Class()
export class DocumentoSalidaProduccion extends DocumentoSalida {

    static override type = ModelType.DocumentoSalidaProduccion;
    override type = ModelType.DocumentoSalidaProduccion;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => SalidaProduccion.initialize( [x] )[0] } ) salidas?: SalidaProduccion[] | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }


    constructor( item?: OptionalModel<DocumentoSalidaProduccion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoSalidaProduccion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoSalidaProduccion> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, DocumentoSalidaProduccion.type, () => {

            this.salidas?.forEach( item => item.assign( {
                documentoFuente: this
            } ).setRelation( context ) )

        } );

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
        this.salidas ??= [];
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