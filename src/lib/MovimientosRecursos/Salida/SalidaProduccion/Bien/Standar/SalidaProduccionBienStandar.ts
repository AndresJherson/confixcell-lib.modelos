import Decimal from 'decimal.js';
import { ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionBien, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienStandar extends SalidaProduccionBien {
    static override type = ModelType.SalidaProduccionBienStandar;
    override type = ModelType.SalidaProduccionBienStandar;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaProduccionBienActividad( x ) } ) actividades?: SalidaProduccionBienActividad[] | null;

    constructor( item?: OptionalModel<SalidaProduccionBienStandar> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBienStandar> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBienStandar> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SalidaProduccionBienStandar.type, () => {

            this.actividades?.forEach( act => {

                act.assign( {
                    salidaProduccionBienStandar: this
                } ).setRelation( context )

            } );

        } );

        return this;

    }


    // calcular valores unitarios
    override procesarInformacion(): this {
        try {

            this.importeCostoUnitario = this.actividades?.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().decimalImporteCostoNeto ),
                new Decimal( 0 )
            )
                .toNumber();

        }
        catch ( error ) {
            this.importeCostoUnitario = 0;
        }

        super.procesarInformacion();

        return this;
    }

    // actividades
    agregarActividad( salida: SalidaProduccionBienActividad ): this {
        this.actividades ??= [];
        this.actividades?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarActividad( salida: SalidaProduccionBienActividad ): this {
        if ( this.actividades ) {
            const i = this.actividades.findIndex( sal => sal.isSameIdentity( salida ) );

            if ( i !== -1 ) {
                this.actividades[i] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarActividad( salida: SalidaProduccionBienActividad ): this {
        this.actividades = this.actividades?.filter( sal => !sal.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getActividad( salida: SalidaProduccionBienActividad ): SalidaProduccionBienActividad | undefined {
        if ( !this.actividades ) return undefined
        const i = this.actividades.findIndex( sal => sal.isSameIdentity( salida ) );
        return this.actividades[i];
    }
}