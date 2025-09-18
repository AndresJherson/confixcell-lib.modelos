import { DateTime } from "luxon";
import { Cast, ExecutionContext, KardexBienConsumo, Model, ModelType, OptionalModel, Prop, PropBehavior } from "../../../index";
import Decimal from "decimal.js";

@Prop.Class()
export class KardexBienConsumoMovimiento extends Model {

    static override type = 'KardexBienConsumoMovimiento';
    override type = 'KardexBienConsumoMovimiento';
    private __KardexBienConsumoMovimiento!: 'KardexBienConsumoMovimiento';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new KardexBienConsumo( x ) } ) kardex?: KardexBienConsumo | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set() referenciaUuid?: string | null;
    @Prop.Set() movimientoTipo?: string | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }

    @Prop.Set() documentoFuenteCodigoSerie?: string | null;
    @Prop.Set() documentoFuenteCodigoNumero?: number | null;
    @Prop.Set() movimientoNumero?: number | null;
    @Prop.Set() concepto?: string | null;

    get codigoDocumentoFuente(): string | undefined {
        const codigoSerie = this.documentoFuenteCodigoSerie ?? '';
        const codigoNumero = this.documentoFuenteCodigoNumero?.toString() ?? '';
        const separadorDocumento = codigoSerie && codigoNumero ? '-' : '';
        const codigoDocumento = `${codigoSerie}${separadorDocumento}${codigoNumero}`.trim();

        const movimientoNumero = this.movimientoNumero?.toString() ?? '';
        const separadorMovimiento = codigoDocumento ? ' ' : '';

        const codigoCompleto = `${codigoDocumento}${separadorMovimiento}${movimientoNumero}`.trim();
        return codigoCompleto ? codigoCompleto : undefined;
    }


    @Prop.Set() entradaCantidad?: number | null;
    @Prop.Set() entradaCostoUnitario?: number | null;
    @Prop.Set() entradaCostoTotal?: number | null;
    @Prop.Set() entradaCantidadAcumulado?: number | null;
    @Prop.Set() entradaCostoAcumulado?: number | null;

    get decimalEntradaCantidad(): Decimal { return Cast.toDecimal( this.entradaCantidad ); }
    get decimalEntradaCostoUnitario(): Decimal { return Cast.toDecimal( this.entradaCostoUnitario ); }
    get decimalEntradaCostoTotal(): Decimal { return Cast.toDecimal( this.entradaCostoTotal ); }
    get decimalEntradaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.entradaCantidadAcumulado ); }
    get decimalEntradaCostoAcumulado(): Decimal { return Cast.toDecimal( this.entradaCostoAcumulado ); }

    @Prop.Set() salidaCantidad?: number | null;
    @Prop.Set() salidaCostoUnitario?: number | null;
    @Prop.Set() salidaCostoTotal?: number | null;
    @Prop.Set() salidaCantidadAcumulado?: number | null;
    @Prop.Set() salidaCostoAcumulado?: number | null;

    get decimalSalidaCantidad(): Decimal { return Cast.toDecimal( this.entradaCantidad ); }
    get decimalSalidaCostoUnitario(): Decimal { return Cast.toDecimal( this.salidaCostoUnitario ); }
    get decimalSalidaCostoTotal(): Decimal { return Cast.toDecimal( this.salidaCostoTotal ); }
    get decimalSalidaCantidadAcumulado(): Decimal { return Cast.toDecimal( this.entradaCantidadAcumulado ); }
    get decimalSalidaCostoAcumulado(): Decimal { return Cast.toDecimal( this.salidaCostoAcumulado ); }

    @Prop.Set() saldoCantidad?: number | null;
    @Prop.Set() saldoValorUnitario?: number | null;
    @Prop.Set() saldoValorTotal?: number | null;

    get decimalSaldoCantidad(): Decimal { return Cast.toDecimal( this.saldoCantidad ); }
    get decimalSaldoValorUnitario(): Decimal { return Cast.toDecimal( this.saldoValorUnitario ); }
    get decimalSaldoValorTotal(): Decimal { return Cast.toDecimal( this.saldoValorTotal ); }


    constructor( item?: OptionalModel<KardexBienConsumoMovimiento> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<KardexBienConsumoMovimiento> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<KardexBienConsumoMovimiento> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, KardexBienConsumoMovimiento.type, () => {

            this.kardex?.setRelation( context )

        } );

        return this;
    }
}