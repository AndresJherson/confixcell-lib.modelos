import Decimal from 'decimal.js';
import { Cast, Credito, ExecutionContext, ICredito, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../index';
import { DateTime, Interval } from 'luxon';

@Prop.Class()
export class Cuota extends Model {

    static override type = 'Cuota';
    override type = 'Cuota';
    private __Cuota!: 'Cuota';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Credito.initialize( [x] )[0] } ) credito?: ICredito<Cuota> | null;
    
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaInicio?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaVencimiento?: string | null;

    get decimalNumero(): Decimal { return Cast.toDecimal( this.numero ); }
    get dateTimeInicio(): DateTime { return Cast.toDateTime( this.fechaInicio ); }
    get dateTimeVencimiento(): DateTime { return Cast.toDateTime( this.fechaVencimiento ); }

    @Prop.Set() duracionMinutos?: number | null;
    @Prop.Set() importeInteres?: number | null;
    @Prop.Set() importeAmortizacion?: number | null;
    @Prop.Set() importeCuota?: number | null;
    @Prop.Set() importeSaldo?: number | null;

    get decimalDuracionMinutos(): Decimal { return Cast.toDecimal( this.duracionMinutos ); }
    get decimalImporteInteres(): Decimal { return Cast.toDecimal( this.importeInteres ); }
    get decimalImporteAmortizacion(): Decimal { return Cast.toDecimal( this.importeAmortizacion ); }
    get decimalImporteCuota(): Decimal { return Cast.toDecimal( this.importeCuota ); }
    get decimalImporteSaldo(): Decimal { return Cast.toDecimal( this.importeSaldo ); }

    @Prop.Set() esActivoMora: boolean = false;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaLimiteMora?: string | null;
    @Prop.Set() importeMora?: number | null;
    @Prop.Set() importeCobrado?: number | null;
    @Prop.Set() importePorCobrar?: number | null;
    @Prop.Set() porcentajeCobrado?: number | null;
    @Prop.Set() porcentajePorCobrar?: number | null;

    get dateTimeLimiteMora(): DateTime { return Cast.toDateTime( this.fechaLimiteMora ); }
    get decimalImporteMora(): Decimal { return Cast.toDecimal( this.importeMora ); }
    get decimalImporteCobrado(): Decimal { return Cast.toDecimal( this.importeCobrado ); }
    get decimalImportePorCobrar(): Decimal { return Cast.toDecimal( this.importePorCobrar ); }
    get decimalPorcentajeCobrado(): Decimal { return Cast.toDecimal( this.porcentajeCobrado ); }
    get decimalPorcentajePorCobrar(): Decimal { return Cast.toDecimal( this.porcentajePorCobrar ); }


    constructor( item?: OptionalModel<Cuota> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Cuota> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Cuota> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        this.credito?.setRelation( context );

        return this;
    }


    static override initialize<TModel extends Model, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( Cuota, data );
    }


    calcularDuracion(): this {
        try {

            const dateTimeInicio = Cast.toDateTime( this.fechaInicio );
            const dateTimeFinal = Cast.toDateTime( this.fechaVencimiento );
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
