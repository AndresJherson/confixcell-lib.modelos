import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionServicioRecursoBienCapital, SalidaProduccionServicioRecursoBienConsumo, SalidaProduccionServicioRecursoServicio, SalidaProduccionServicioStandar } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class SalidaProduccionServicioActividad extends Model {
    static override type: string = 'SalidaProduccionServicioActividad';
    override type: string = SalidaProduccionServicioActividad.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioStandar( x ) ) salidaProduccionServicioStandar?: SalidaProduccionServicioStandar;
    @Prop.Set() nombre?: string;

    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaFinal?: string;

    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
    }

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoBienConsumo( x ) ) recursosBienConsumo?: SalidaProduccionServicioRecursoBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoBienCapital( x ) ) recursosBienCapital?: SalidaProduccionServicioRecursoBienCapital[];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoServicio( x ) ) recursosServicio?: SalidaProduccionServicioRecursoServicio[];

    @Prop.Set() importeCostoNeto?: number;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionServicioActividad> ) {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this {
        try {

            const importeCostoNetoBienConsumo = this.recursosBienConsumo?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.procesarInformacion().decimalImporteCostoNeto ),
                new Decimal( 0 )
            )
                ?? new Decimal( 0 );

            const importeCostoNetoBienCapital = this.recursosBienCapital?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.decimalImporteCostoNeto ),
                new Decimal( 0 )
            )
                ?? new Decimal( 0 );

            const importeCostoNetoServicio = this.recursosServicio?.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.decimalImporteCostoNeto ),
                new Decimal( 0 )
            )
                ?? new Decimal( 0 );

            
            this.importeCostoNeto = importeCostoNetoBienConsumo.plus( importeCostoNetoBienCapital )
                .plus( importeCostoNetoServicio )
                .toNumber();
        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        return this;
    }


    // recursos bien consumo
    agregarRecursoBienConsumo( recurso: SalidaProduccionServicioRecursoBienConsumo ): this {
        this.recursosBienConsumo?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoBienConsumo( recurso: SalidaProduccionServicioRecursoBienConsumo ): this {
        if ( this.recursosBienConsumo ) {
            const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosBienConsumo[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoBienConsumo( recurso: SalidaProduccionServicioRecursoBienConsumo ): this {
        this.recursosBienConsumo = this.recursosBienConsumo?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoBienConsumo( recurso: SalidaProduccionServicioRecursoBienConsumo ): SalidaProduccionServicioRecursoBienConsumo | undefined {
        if ( !this.recursosBienConsumo ) return undefined
        const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosBienConsumo[i];
    }


    // recursos bien capital
    agregarRecursoBienCapital( recurso: SalidaProduccionServicioRecursoBienCapital ): this {
        this.recursosBienCapital?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoBienCapital( recurso: SalidaProduccionServicioRecursoBienCapital ): this {
        if ( this.recursosBienCapital ) {
            const i = this.recursosBienCapital.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosBienCapital[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoBienCapital( recurso: SalidaProduccionServicioRecursoBienCapital ): this {
        this.recursosBienCapital = this.recursosBienCapital?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoBienCapital( recurso: SalidaProduccionServicioRecursoBienCapital ): SalidaProduccionServicioRecursoBienCapital | undefined {
        if ( !this.recursosBienCapital ) return undefined
        const i = this.recursosBienCapital.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosBienCapital[i];
    }


    // recursos servicio
    agregarRecursoServicio( recurso: SalidaProduccionServicioRecursoServicio ): this {
        this.recursosServicio?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoServicio( recurso: SalidaProduccionServicioRecursoServicio ): this {
        if ( this.recursosServicio ) {
            const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosServicio[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoServicio( recurso: SalidaProduccionServicioRecursoServicio ): this {
        this.recursosServicio = this.recursosServicio?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoServicio( recurso: SalidaProduccionServicioRecursoServicio ): SalidaProduccionServicioRecursoServicio | undefined {
        if ( !this.recursosServicio ) return undefined
        const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosServicio[i];
    }
}