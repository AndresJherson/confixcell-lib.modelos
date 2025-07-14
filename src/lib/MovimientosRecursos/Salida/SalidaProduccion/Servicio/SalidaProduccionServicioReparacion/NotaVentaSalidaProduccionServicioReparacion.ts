import Decimal from 'decimal.js';
import { ExecutionContext, ModelType, NotaVenta, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo, NotaVentaSalidaProduccionServicioReparacionRecursoServicio, OptionalModel, PantallaModelo, Prop, PropBehavior, SalidaProduccion, SalidaProduccionServicio, Servicio } from '../../../../../../index';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacion extends SalidaProduccionServicio {

    static override type = ModelType.NotaVentaSalidaProduccionServicioReparacion;
    override type = ModelType.NotaVentaSalidaProduccionServicioReparacion;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVenta( x ) } ) override documentoFuente?: NotaVenta | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Servicio.initialize( [x] )[0] } ) override servicio?: Servicio | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new PantallaModelo( x ) } ) pantallaModelo?: PantallaModelo | null;
    @Prop.Set() imei?: string | null;
    @Prop.Set() patron?: number | null;
    @Prop.Set() contrasena?: string | null;
    @Prop.Set() diagnostico?: string | null;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo( x ) } ) recursosBienConsumo?: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new NotaVentaSalidaProduccionServicioReparacionRecursoServicio( x ) } ) recursosServicio?: NotaVentaSalidaProduccionServicioReparacionRecursoServicio[] | null;


    constructor( item?: OptionalModel<NotaVentaSalidaProduccionServicioReparacion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacion> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaVentaSalidaProduccionServicioReparacion.type, () => {

            this.pantallaModelo?.setRelation( context );

            this.recursosBienConsumo?.forEach( recurso => recurso.assign( {
                salidaProduccion: this
            } ).setRelation( context ) )

            this.recursosServicio?.forEach( recurso => recurso.assign( {
                salidaProduccion: this
            } ).setRelation( context ) )

        } );

        return this;
    }


    override procesarInformacion(): this {

        try {
            const importeCostoNetoBienConsumo = this.recursosBienConsumo?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.procesarInformacion().importeCostoNeto ?? 0 ),
                new Decimal( 0 )
            )
                ?? new Decimal( 0 );

            const importeCostoNetoServicio = this.recursosServicio?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeCostoNeto ?? 0 ),
                new Decimal( this.importeCostoNeto ?? 0 )
            )
                ?? new Decimal( 0 );

            this.importeCostoNeto = importeCostoNetoBienConsumo.plus( importeCostoNetoServicio ).toNumber();
        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }


        // Importe precio neto es el importe adicional
        try {
            const importeValorNetoBienConsumo = this.recursosBienConsumo?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeValorNeto ?? 0 ),
                new Decimal( 0 )
            )
                ?? new Decimal( 0 );

            const importeValorNetoServicio = this.recursosServicio?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeValorNeto ?? 0 ),
                new Decimal( this.importeValorNeto ?? 0 )
            )
                ?? new Decimal( 0 );

            this.importeValorNeto = importeValorNetoBienConsumo.plus( importeValorNetoServicio ).toNumber();

        }
        catch ( error ) {
            this.importeValorNeto = 0;
        }

        return this;
    }


    // recursos bien consumo
    agregarRecursoBienConsumo( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo ): this {
        this.recursosBienConsumo ??= [];
        this.recursosBienConsumo?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoBienConsumo( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo ): this {
        if ( this.recursosBienConsumo ) {
            const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosBienConsumo[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoBienConsumo( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo ): this {
        this.recursosBienConsumo = this.recursosBienConsumo?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoBienConsumo( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo ): NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo | undefined {
        if ( !this.recursosBienConsumo ) return undefined
        const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosBienConsumo[i];
    }


    agregarRecursoServicio( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoServicio ): this {
        this.recursosServicio ??= [];
        this.recursosServicio?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoServicio( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoServicio ): this {
        if ( this.recursosServicio ) {
            const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosServicio[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoServicio( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoServicio ): this {
        this.recursosServicio = this.recursosServicio?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoServicio( recurso: NotaVentaSalidaProduccionServicioReparacionRecursoServicio ): NotaVentaSalidaProduccionServicioReparacionRecursoServicio | undefined {
        if ( !this.recursosServicio ) return undefined
        const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosServicio[i];
    }
}