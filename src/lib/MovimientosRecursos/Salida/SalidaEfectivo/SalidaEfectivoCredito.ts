import Decimal from 'decimal.js';
import { Credito, ICredito, Prop, PropBehavior, Proporcion, SalidaEfectivo, SalidaEfectivoCuota, TipoProporcion } from '../../../../index';

@Prop.Class()
export class SalidaEfectivoCredito extends SalidaEfectivo implements ICredito {
    static override type: string = 'SalidaEfectivoCredito';
    override type: string = SalidaEfectivoCredito.type;

    @Prop.Set() tasaInteresDiario?: number;
    @Prop.Set() importeInteres?: number;
    @Prop.Set() porcentajeInteres?: number;
    @Prop.Set() importeValorFinal?: number;

    get decimalTasaInteresDiario(): Decimal {
        return Prop.toDecimal( this.tasaInteresDiario );
    }
    get decimalImporteInteres(): Decimal {
        return Prop.toDecimal( this.importeInteres );
    }
    get decimalPorcentajeInteres(): Decimal {
        return Prop.toDecimal( this.porcentajeInteres );
    }
    get decimalImporteValorFinal(): Decimal {
        return Prop.toDecimal( this.importeValorFinal );
    }

    @Prop.Set( PropBehavior.array, x => new SalidaEfectivoCuota( x ) ) cuotas?: SalidaEfectivoCuota[];

    @Prop.Set() duracionMinutos?: number;
    interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    credito: Credito = new Credito();

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }

    constructor( item?: Partial<SalidaEfectivoCredito> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<SalidaEfectivoCredito> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.cuotas?.forEach( cuota =>
            cuota.set( {
                credito: new SalidaEfectivoCredito( { id: this.id, uuid: this.uuid, symbol: this.symbol } )
            } )
                .setRelation()
        );

        return this;
    }


    agregarCuota( cuota: SalidaEfectivoCuota ): this {
        return this.credito.agregarCuota( this, cuota );
    }


    actualizarCuota( cuota: SalidaEfectivoCuota ): this {
        return this.credito.actualizarCuota( this, cuota );
    }


    eliminarCuota( cuota: SalidaEfectivoCuota ): this {
        return this.credito.eliminarCuota( this, cuota );
    }


    getCuota( cuota: SalidaEfectivoCuota ): SalidaEfectivoCuota | undefined {
        return this.credito.getCuota( this, cuota );
    }


    override procesarInformacion(): this {
        return this.credito.procesarInformacion( this );
    }


    procesarPagos( importeCobrado: number ): this {
        return this.credito.procesarPagos( this, importeCobrado );
    }
}