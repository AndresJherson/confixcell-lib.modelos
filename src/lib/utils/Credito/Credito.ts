import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, Proporcion } from '../../../index';
import { DateTime, Interval } from 'luxon';


export interface ICredito
{
    importeValorNeto?: number;
    tasaInteresDiario?: number;
    importeInteres?: number;
    porcentajeInteres?: number;
    importeValorFinal?: number;
    
    get decimalImporteValorNeto(): Decimal;
    get decimalTasaInteresDiario(): Decimal;
    get decimalImporteInteres(): Decimal;
    get decimalPorcentajeInteres(): Decimal;
    get decimalImporteValorFinal(): Decimal;

    cuotas?: Cuota[];

    duracionMinutos?: number;
    interesXminuto: Proporcion;
    amortizacionXminuto: Proporcion;
    cuotaXminuto: Proporcion;
    credito: Credito;
    get decimalDuracionMinutos(): Decimal;

    procesarInformacion(): this
    procesarPagos( importeCobrado: number ): this

    agregarCuota( cuota: Cuota ): this;
    actualizarCuota( cuota: Cuota ): this;
    eliminarCuota( cuota: Cuota ): this;
    getCuota( cuota: Cuota ): Cuota | undefined;
}


export class Credito
{
    agregarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T
    {
        cuota.fechaInicio = !credito.cuotas?.length
                            ? ( cuota.fechaInicio ?? Prop.toDateTimeNow().toSQL() )
                            : ( cuota.fechaInicio ?? credito.cuotas[ credito.cuotas.length - 1 ].fechaVencimiento );

        credito.cuotas?.push( cuota );

        credito.procesarInformacion();
        
        return credito;
    }


    actualizarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T
    {
        if ( credito.cuotas ) {
            let i = credito.cuotas.findIndex( x => x.symbol === cuota.symbol );
    
            i = i === -1
                ? credito.cuotas.findIndex( x => 
                    ( x.id === undefined || cuota.id === undefined )
                        ? false
                        : ( x.id === cuota.id )
                )
                : i;
    
            if ( i !== -1 ) {
                credito.cuotas[ i ] = cuota;
                credito.procesarInformacion();
            }
        }

        return credito;
    }


    eliminarCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): T
    {
        credito.cuotas = credito.cuotas?.filter( x => x.symbol !== cuota.symbol );
        credito.cuotas = credito.cuotas?.filter( x => 
            ( x.id === undefined || cuota.id === undefined )
                ? true
                : ( x.id !== cuota.id )
        );

        credito.procesarInformacion();

        return credito;
    }


    getCuota<T extends ICredito, C extends Cuota>( credito: T, cuota: C ): C | undefined
    {
        if ( !credito.cuotas ) return undefined;

        let i = credito.cuotas.findIndex( x => x.symbol === cuota.symbol );

        i = i === -1
            ? credito.cuotas.findIndex( x => 
                ( x.id === undefined || cuota.id === undefined )
                    ? false
                    : ( x.id === cuota.id )
            )
            : i;

        return credito.cuotas[ i ] as C;
    }


    procesarInformacion<T extends ICredito>( credito: T ): T
    {   
        try {

            credito.duracionMinutos = credito.cuotas?.reduce(
                ( minuto, cuota, i ) => {
                    
                    cuota.numero = i + 1;

                    cuota.fechaInicio = i === 0
                                        ? cuota.fechaInicio
                                        : ( credito.cuotas ? credito.cuotas[ i - 1 ].fechaVencimiento : undefined );

                    return minuto.plus( cuota.calcularDuracion().duracionMinutos ?? 0 )
    
                },
                new Decimal( 0 )
            )
            .toDecimalPlaces( 2 )
            .toNumber();
    
    
            try {
                credito.interesXminuto.antecedente = credito.decimalTasaInteresDiario
                                                    .div( 1440 )
                                                    .div( 100 )
                                                    .mul( credito.importeValorNeto ?? 0 )
                                                    .toNumber();
    
                credito.interesXminuto.consecuente = 1;
            }
            catch ( error ) {
                credito.interesXminuto.antecedente = 0;
                credito.interesXminuto.consecuente = 0;
            }
    
    
            try {
                credito.amortizacionXminuto.antecedente = credito.decimalImporteValorNeto
                                                        .div( credito.duracionMinutos ?? 0 )
                                                        .toNumber();
    
                credito.amortizacionXminuto.consecuente = 1;
            }
            catch ( error ) {
                credito.amortizacionXminuto.antecedente = 0;
                credito.amortizacionXminuto.consecuente = 0;
            }
    
    
            credito.cuotaXminuto.antecedente = new Decimal( credito.amortizacionXminuto.antecedente )
                                            .plus( credito.interesXminuto.antecedente )
                                            .toNumber();
            credito.cuotaXminuto.consecuente = 1;
    
    
            credito.importeInteres = credito.interesXminuto.calcularAntecedente( credito.duracionMinutos ?? 0 )
                                .toDecimalPlaces( 2 )
                                .toNumber();

            credito.porcentajeInteres = credito.decimalImporteInteres
                                        .div( credito.importeValorNeto ?? 0 )
                                        .mul( 100 )
                                        .toDecimalPlaces( 2 )
                                        .toNumber();

            credito.importeValorFinal = credito.decimalImporteValorNeto
                                    .plus( credito.importeInteres )
                                    .toDecimalPlaces( 2 )
                                    .toNumber();
    
            this.calcularCuotas( credito );

            const cuotasLength = credito.cuotas?.length ?? 0;
            const ultimaCuota = credito.cuotas ? credito.cuotas[ cuotasLength - 1 ] : undefined;
            if (
                cuotasLength > 1 &&
                ultimaCuota &&
                ultimaCuota.importeSaldo !== 0
            ) {
                
                ultimaCuota.importeAmortizacion = credito.cuotas ? credito.cuotas[ cuotasLength - 2 ].importeSaldo : undefined;
                ultimaCuota.importeCuota = ultimaCuota.decimalImporteAmortizacion
                                            .plus( ultimaCuota.importeInteres ?? 0 )
                                            .toDecimalPlaces( 2 )
                                            .toNumber();
                ultimaCuota.importeSaldo = 0;

            }


        }
        catch ( error ) {
            throw new Error( 'Error al calcular el credito' );
        }


        return credito;
    }


    private calcularCuotas<T extends ICredito>( credito: T ): T
    {
        try {
            credito.cuotas?.forEach( ( cuota, i ) => {
    
                cuota.importeAmortizacion = credito.amortizacionXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
                                            .toDecimalPlaces( 2 )            
                                            .toNumber();
                                            
                cuota.importeInteres = credito.interesXminuto.calcularAntecedente( cuota.duracionMinutos ?? 0 )
                                        .toDecimalPlaces( 2 )
                                        .toNumber();

                cuota.importeCuota = cuota.decimalImporteAmortizacion
                                    .plus( cuota.importeInteres )
                                    .toDecimalPlaces( 2 )
                                    .toNumber();
    
                cuota.importeSaldo = i === 0
                                    ? credito.decimalImporteValorNeto
                                        .minus( cuota.importeAmortizacion )
                                        .toDecimalPlaces( 2 )
                                        .toNumber()
                                    : (
                                        credito.cuotas
                                        ? credito.cuotas[ i - 1 ].decimalImporteSaldo
                                            .minus( cuota.importeAmortizacion )
                                            .toDecimalPlaces( 2 )
                                            .toNumber()
                                        : undefined
                                    )
                                        
                        
                cuota.importeMora = 0;

    
                if ( !cuota.esActivoMora ) return;
                
                const interval = Interval.fromDateTimes( Prop.toDateTime( cuota.fechaVencimiento ), Prop.toDateTime( cuota.fechaLimiteMora ) );
                const minutos = interval.isValid
                                ? interval.length( 'minutes' )
                                : 0;
    
                cuota.importeMora = credito.interesXminuto.calcularAntecedente( minutos )
                                    .toDecimalPlaces( 2 )
                                    .toNumber();
    
            } );
        }
        catch ( error ) {
            throw new Error( 'Error al calcular cuotas' );
        }

        return credito;
    }


    procesarPagos<T extends ICredito>( credito: T, importeCobrado: number ): T
    {
        try {
            
            let saldoCobrado = importeCobrado;

            credito.cuotas?.forEach( cuota => {

                const decimalSaldoCobrado = new Decimal( saldoCobrado );
                saldoCobrado = decimalSaldoCobrado
                                .minus( cuota.importeCuota ?? 0 )
                                .toNumber();

                if ( saldoCobrado > 0 ) {
                    
                    cuota.importeCobrado = cuota.importeCuota;
                    cuota.importePorCobrar = 0;
                    cuota.porcentajeCobrado = 100.00;
                    cuota.porcentajePorCobrar = 0.00;

                }
                else {

                    cuota.importeCobrado = decimalSaldoCobrado
                                            .toDecimalPlaces( 2 )
                                            .toNumber();

                    cuota.importePorCobrar = cuota.decimalImporteCuota
                                            .minus( decimalSaldoCobrado )
                                            .toDecimalPlaces( 2 )
                                            .toNumber();

                    try {
                        cuota.porcentajeCobrado = decimalSaldoCobrado
                                                    .div( cuota.importeCuota ?? 0 )
                                                    .mul( 100 )
                                                    .toDecimalPlaces( 2 )
                                                    .toNumber();
                            
                        cuota.porcentajePorCobrar = new Decimal( 100.00 )
                                                .minus( cuota.porcentajeCobrado )
                                                .toDecimalPlaces( 2 )
                                                .toNumber();

                    }
                    catch ( error ) {
                        cuota.porcentajeCobrado = 0;
                        cuota.porcentajePorCobrar = 0;
                    }

                }

            } );
            
        }
        catch ( error: any ) {
            throw new Error( 'Error al calcular importes cobrados del Crédito' );
        }

        return credito;
    }
}


@Prop.Class()
export class Cuota extends Model
{
    static override type: string = 'Cuota';
    override type: string = Cuota.type;

    @Prop.Set() numero?: number;
    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaVencimiento?: string;

    get decimalNumero(): Decimal {
        return Prop.toDecimal( this.numero );
    }
    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeVencimiento(): DateTime {
        return Prop.toDateTime( this.fechaVencimiento );
    }

    @Prop.Set() duracionMinutos?: number;
    @Prop.Set() importeInteres?: number;
    @Prop.Set() importeAmortizacion?: number;
    @Prop.Set() importeCuota?: number;
    @Prop.Set() importeSaldo?: number;

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }
    get decimalImporteInteres(): Decimal {
        return Prop.toDecimal( this.importeInteres );
    }
    get decimalImporteAmortizacion(): Decimal {
        return Prop.toDecimal( this.importeAmortizacion );
    }
    get decimalImporteCuota(): Decimal {
        return Prop.toDecimal( this.importeCuota );
    }
    get decimalImporteSaldo(): Decimal {
        return Prop.toDecimal( this.importeSaldo );
    }

    @Prop.Set() esActivoMora: boolean = false;
    @Prop.Set( PropBehavior.datetime ) fechaLimiteMora?: string;
    @Prop.Set() importeMora?: number;
    @Prop.Set() importeCobrado?: number;
    @Prop.Set() importePorCobrar?: number;
    @Prop.Set() porcentajeCobrado?: number;
    @Prop.Set() porcentajePorCobrar?: number;
    
    get dateTimeLimiteMora(): DateTime {
        return Prop.toDateTime( this.fechaLimiteMora );
    }
    get decimalImporteMora(): Decimal {
        return Prop.toDecimal( this.importeMora );
    }
    get decimalImporteCobrado(): Decimal {
        return Prop.toDecimal( this.importeCobrado );
    }
    get decimalImportePorCobrar(): Decimal {
        return Prop.toDecimal( this.importePorCobrar );
    }
    get decimalPorcentajeCobrado(): Decimal {
        return Prop.toDecimal( this.porcentajeCobrado );
    }
    get decimalPorcentajePorCobrar(): Decimal {
        return Prop.toDecimal( this.porcentajePorCobrar );
    }
    

    constructor( item?: Partial<Cuota> )
    {
        super()
        Prop.initialize( this, item );
    }


    calcularDuracion(): this
    {
        try {

            const dateTimeInicio = Prop.toDateTime( this.fechaInicio );
            const dateTimeFinal = Prop.toDateTime( this.fechaVencimiento );
            const interval = Interval.fromDateTimes( dateTimeInicio, dateTimeFinal );             

            this.duracionMinutos = interval.isValid
                                    ? interval.length( 'minutes' )
                                    : 0;
            
        }
        catch ( error ) {
            throw new Error( `Error al calcular cuota Nº ${this.numero}` );
        }

        return this;
    }
}