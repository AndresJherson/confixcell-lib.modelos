import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionBienRecursoBienCapital, SalidaProduccionBienRecursoBienConsumo, SalidaProduccionBienRecursoServicio, SalidaProduccionBienStandar } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class SalidaProduccionBienActividad extends Model {
    static override type: string = 'SalidaProduccionBienActividad';
    override type: string = SalidaProduccionBienActividad.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionBienStandar( x ) ) salidaProduccionBienStandar?: SalidaProduccionBienStandar;
    @Prop.Set() nombre?: string;

    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaFinal?: string;

    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
    }

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoBienConsumo( x ) ) recursosBienConsumo?: SalidaProduccionBienRecursoBienConsumo[];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoBienCapital( x ) ) recursosBienCapital?: SalidaProduccionBienRecursoBienCapital[];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoServicio( x ) ) recursosServicio?: SalidaProduccionBienRecursoServicio[];

    @Prop.Set() importeCostoNeto?: number;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionBienActividad> ) {
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
    agregarRecursoBienConsumo( recurso: SalidaProduccionBienRecursoBienConsumo ): this {
        this.recursosBienConsumo?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoBienConsumo( recurso: SalidaProduccionBienRecursoBienConsumo ): this {
        if ( this.recursosBienConsumo ) {
            const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosBienConsumo[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoBienConsumo( recurso: SalidaProduccionBienRecursoBienConsumo ): this {
        this.recursosBienConsumo = this.recursosBienConsumo?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoBienConsumo( recurso: SalidaProduccionBienRecursoBienConsumo ): SalidaProduccionBienRecursoBienConsumo | undefined {
        if ( !this.recursosBienConsumo ) return undefined
        const i = this.recursosBienConsumo.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosBienConsumo[i];
    }


    // recursos bien capital
    agregarRecursoBienCapital( recurso: SalidaProduccionBienRecursoBienCapital ): this {
        this.recursosBienCapital?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoBienCapital( recurso: SalidaProduccionBienRecursoBienCapital ): this {
        if ( this.recursosBienCapital ) {
            const i = this.recursosBienCapital.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosBienCapital[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoBienCapital( recurso: SalidaProduccionBienRecursoBienCapital ): this {
        this.recursosBienCapital = this.recursosBienCapital?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoBienCapital( recurso: SalidaProduccionBienRecursoBienCapital ): SalidaProduccionBienRecursoBienCapital | undefined {
        if ( !this.recursosBienCapital ) return undefined
        const i = this.recursosBienCapital.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosBienCapital[i];
    }


    // recursos servicio
    agregarRecursoServicio( recurso: SalidaProduccionBienRecursoServicio ): this {
        this.recursosServicio?.unshift( recurso );
        this.procesarInformacion();
        return this;
    }


    actualizarRecursoServicio( recurso: SalidaProduccionBienRecursoServicio ): this {
        if ( this.recursosServicio ) {
            const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );

            if ( i !== -1 ) {
                this.recursosServicio[i] = recurso;
                this.procesarInformacion();
            }
        }

        return this;
    }


    eliminarRecursoServicio( recurso: SalidaProduccionBienRecursoServicio ): this {
        this.recursosServicio = this.recursosServicio?.filter( item => !item.isSameIdentity( recurso ) );
        this.procesarInformacion();
        return this;
    }


    getRecursoServicio( recurso: SalidaProduccionBienRecursoServicio ): SalidaProduccionBienRecursoServicio | undefined {
        if ( !this.recursosServicio ) return undefined
        const i = this.recursosServicio.findIndex( item => item.isSameIdentity( recurso ) );
        return this.recursosServicio[i];
    }
}