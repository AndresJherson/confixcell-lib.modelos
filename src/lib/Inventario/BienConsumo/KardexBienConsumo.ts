import { DateTime } from 'luxon';
import { Almacen, BienConsumo, Cast, ErrorKardexBienConsumo, EventoPendienteKardexBienConsumo, ExecutionContext, InventarioBienConsumo, KardexBienConsumoMovimiento, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../index';
import Decimal from 'decimal.js';

@Prop.Class()
export class KardexBienConsumo extends Model {

    static override type: string = ModelType.KardexBienConsumo;
    override type: string = ModelType.KardexBienConsumo;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new InventarioBienConsumo( x ) } ) inventario?: InventarioBienConsumo | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new EventoPendienteKardexBienConsumo( x ) } ) eventosPendientes?: EventoPendienteKardexBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new ErrorKardexBienConsumo( x ) } ) errores?: ErrorKardexBienConsumo[] | null;
    @Prop.Set( { behavior: PropBehavior.array, getValue: x => new KardexBienConsumoMovimiento( x ) } ) movimientos?: KardexBienConsumoMovimiento[] | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaCreacion?: string | null;
    @Prop.Set( { behavior: PropBehavior.datetime } ) fechaActualizacion?: string | null;

    get dateTimeFechaCreacion(): DateTime { return Cast.toDateTime( this.fechaCreacion ); }
    get dateTimeFechaActualizacion(): DateTime { return Cast.toDateTime( this.fechaActualizacion ); }

    @Prop.Set() entradaCantidadAcumulado?: number | null;
    @Prop.Set() entradaCostoAcumulado?: number | null;
    @Prop.Set() salidaCantidadAcumulado?: number | null;
    @Prop.Set() salidaCostoAcumulado?: number | null;
    @Prop.Set() saldoCantidad?: number | null;
    @Prop.Set() saldoValorUnitario?: number | null;
    @Prop.Set() saldoValorTotal?: number | null;

    get decimalEntradaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.entradaCantidadAcumulado ); }
    get decimalEntradaCostoAcumulado(): Decimal { return Cast.toDecimal( this.entradaCostoAcumulado ); }
    get decimalSalidaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.salidaCantidadAcumulado ); }
    get decimalSalidaCostoAcumulado(): Decimal { return Cast.toDecimal( this.salidaCostoAcumulado ); }
    get decimalSaldoCantidad(): Decimal { return Cast.toDecimal( this.saldoCantidad ); }
    get decimalSaldoValorUnitario(): Decimal { return Cast.toDecimal( this.saldoValorUnitario ); }
    get decimalSaldoValorTotal(): Decimal { return Cast.toDecimal( this.saldoValorTotal ); }


    constructor( item?: OptionalModel<KardexBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<KardexBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<KardexBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, KardexBienConsumo.type, () => {

            this.inventario?.setRelation( context );

            this.almacen?.setRelation( context );

            this.bienConsumo?.setRelation( context );

            this.eventosPendientes?.forEach( item => item.assign( {
                kardex: this
            } ).setRelation( context ) );

            this.errores?.forEach( item => item.assign( {
                kardex: this
            } ).setRelation( context ) )

            this.movimientos?.forEach( item => item.assign( {
                kardex: this
            } ).setRelation( context ) );

        } );

        return this;
    }
}