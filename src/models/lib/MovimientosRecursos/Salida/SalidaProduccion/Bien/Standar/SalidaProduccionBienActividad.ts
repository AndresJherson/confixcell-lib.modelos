import Decimal from 'decimal.js';
import { Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionBienRecursoBienCapital, SalidaProduccionBienRecursoBienConsumo, SalidaProduccionBienRecursoServicio, SalidaProduccionBienStandar } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class SalidaProduccionBienActividad extends Model {

    static override type = 'SalidaProduccionBienActividad';
    override type = 'SalidaProduccionBienActividad';
    private __SalidaProduccionBienActividad!: 'SalidaProduccionBienActividad';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionBienStandar( x ) } ) salidaProduccionBienStandar?: SalidaProduccionBienStandar | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set() nombre?: string | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaInicio?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaFinal?: string | null;

    get dateTimeInicio(): DateTime { return Cast.toDateTime( this.fechaInicio ); }
    get dateTimeFinal(): DateTime { return Cast.toDateTime( this.fechaFinal ); }

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaProduccionBienRecursoBienConsumo( x ) } ) recursosBienConsumo?: SalidaProduccionBienRecursoBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaProduccionBienRecursoBienCapital( x ) } ) recursosBienCapital?: SalidaProduccionBienRecursoBienCapital[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new SalidaProduccionBienRecursoServicio( x ) } ) recursosServicio?: SalidaProduccionBienRecursoServicio[] | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }


    constructor( item?: OptionalModel<SalidaProduccionBienActividad> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBienActividad> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBienActividad> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SalidaProduccionBienActividad.type, () => {

            this.salidaProduccionBienStandar?.setRelation( context );

            this.recursosBienConsumo?.forEach( recurso => recurso.assign( {
                actividad: this
            } ).setRelation( context ) )

            this.recursosBienCapital?.forEach( recurso => recurso.assign( {
                actividad: this
            } ).setRelation( context ) )

            this.recursosServicio?.forEach( recurso => recurso.assign( {
                actividad: this
            } ).setRelation( context ) )

        } );

        return this;
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
        this.recursosBienConsumo ??= [];
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
        this.recursosBienCapital ??= [];
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
        this.recursosServicio ??= [];
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