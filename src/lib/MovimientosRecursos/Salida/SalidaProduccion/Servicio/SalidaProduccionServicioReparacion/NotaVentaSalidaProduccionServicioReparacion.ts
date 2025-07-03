import Decimal from 'decimal.js';
import { NotaVenta, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo, NotaVentaSalidaProduccionServicioReparacionRecursoServicio, PantallaModelo, Prop, PropBehavior, SalidaProduccion, SalidaProduccionServicio, Servicio } from '../../../../../../index';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacion extends SalidaProduccionServicio {
    static override type: string = 'NotaVentaSalidaProduccionServicioReparacion';
    override type: string = NotaVentaSalidaProduccionServicioReparacion.type;

    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set( PropBehavior.model, x => new Servicio( x ) ) declare servicio?: Servicio;
    @Prop.Set( PropBehavior.model, x => new PantallaModelo( x ) ) pantallaModelo?: PantallaModelo;
    @Prop.Set() imei?: string;
    @Prop.Set() patron?: number;
    @Prop.Set() contrasena?: string;
    @Prop.Set() diagnostico?: string;

    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo( x ) ) recursosBienConsumo?: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaProduccionServicioReparacionRecursoServicio( x ) ) recursosServicio?: NotaVentaSalidaProduccionServicioReparacionRecursoServicio[];


    constructor( item?: Partial<NotaVentaSalidaProduccionServicioReparacion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<NotaVentaSalidaProduccionServicioReparacion> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.recursosServicio?.forEach( recurso =>
            recurso.set( {
                salidaProduccion: new NotaVentaSalidaProduccionServicioReparacion( { id: this.id, symbol: this.symbol } )
            } )
                .setRelation()
        );


        this.recursosBienConsumo?.forEach( recurso =>
            recurso.set( {
                salidaProduccion: new NotaVentaSalidaProduccionServicioReparacion( { id: this.id, symbol: this.symbol } )
            } )
                .setRelation()
        );


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