import Decimal from 'decimal.js';
import { ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionServicio, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioStandar extends SalidaProduccionServicio {

    static override type: string = ModelType.SalidaProduccionServicioStandar;
    override type: string = ModelType.SalidaProduccionServicioStandar;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaProduccionServicioActividad( x ) } ) actividades?: SalidaProduccionServicioActividad[] | null;

    constructor( item?: OptionalModel<SalidaProduccionServicioStandar> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionServicioStandar> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionServicioStandar> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaProduccionServicioStandar.type, () => {
            
            this.actividades?.forEach( act => act.assign({
                salidaProduccionServicioStandar: this
            }).setRelation( context ) )

        } );

        return this;
    }


    // calcular valores netos
    override procesarInformacion(): this {
        try {

            this.importeCostoNeto = this.actividades?.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().decimalImporteCostoNeto ),
                new Decimal( 0 )
            )
                .toNumber();

        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        super.procesarInformacion();

        return this;
    }


    // actividades
    agregarActividad( salida: SalidaProduccionServicioActividad ): this {
        this.actividades ??= [];
        this.actividades?.unshift( salida );
        this.procesarInformacion();
        return this;
    }


    actualizarActividad( salida: SalidaProduccionServicioActividad ): this {
        if ( this.actividades ) {
            const i = this.actividades.findIndex( item => item.isSameIdentity( salida ) );

            if ( i !== -1 ) {
                this.actividades[i] = salida;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarActividad( salida: SalidaProduccionServicioActividad ): this {
        this.actividades = this.actividades?.filter( item => !item.isSameIdentity( salida ) );
        this.procesarInformacion();
        return this;
    }


    getActividad( salida: SalidaProduccionServicioActividad ): SalidaProduccionServicioActividad | undefined {
        if ( !this.actividades ) return undefined
        const i = this.actividades.findIndex( item => item.isSameIdentity( salida ) );
        return this.actividades[i];
    }
}