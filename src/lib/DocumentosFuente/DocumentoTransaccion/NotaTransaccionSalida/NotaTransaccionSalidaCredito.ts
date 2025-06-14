import Decimal from 'decimal.js';
import { Credito, ICredito, NotaTransaccionSalida, NotaTransaccionSalidaCuota, Prop, PropBehavior, Proporcion, SalidaEfectivo, TipoProporcion } from '../../../../index';

@Prop.Class()
export class NotaTransaccionSalidaCredito extends SalidaEfectivo implements ICredito
{
    static override type: string = 'NotaTransaccionSalidaCredito';
    override type: string = NotaTransaccionSalidaCredito.type;

    @Prop.Set( PropBehavior.model, x => new NotaTransaccionSalida( x ) ) declare documentoFuente?: NotaTransaccionSalida;
    @Prop.Set( PropBehavior.array, x => new NotaTransaccionSalidaCuota( x ) ) cuotas?: NotaTransaccionSalidaCuota[];

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

    @Prop.Set() duracionMinutos?: number;
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) interesXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) amortizacionXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) cuotaXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Credito() ) credito: Credito = new Credito();

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }

    constructor( item?: Partial<NotaTransaccionSalidaCredito> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaTransaccionSalidaCredito>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.cuotas?.forEach( cuota => 
            cuota.set({
                credito: new NotaTransaccionSalidaCredito({ id: this.id, symbol: this.symbol })
            })
            .setRelation()
        )

        return this;
    }


    agregarCuota(cuota: NotaTransaccionSalidaCuota ): this {
        return this.credito.agregarCuota( this, cuota );
    }


    actualizarCuota(cuota: NotaTransaccionSalidaCuota ): this {
        return this.credito.actualizarCuota( this, cuota );
    }


    eliminarCuota(cuota: NotaTransaccionSalidaCuota ): this {
        return this.credito.eliminarCuota( this, cuota );
    }


    getCuota(cuota: NotaTransaccionSalidaCuota ): NotaTransaccionSalidaCuota | undefined {
        return this.credito.getCuota( this, cuota );
    }


    override procesarInformacion(): this {
        return this.credito.procesarInformacion( this );
    }


    procesarPagos(importeCobrado: number): this {
        return this.credito.procesarPagos( this, importeCobrado );
    }
}