import Decimal from 'decimal.js';
import { Credito, EntradaEfectivo, ICredito, NotaTransaccionEntrada, NotaTransaccionEntradaCuota, Prop, PropBehavior, Proporcion, TipoProporcion } from '../../../../index';

@Prop.Class()
export class NotaTransaccionEntradaCredito extends EntradaEfectivo implements ICredito
{
    static override type: string = 'NotaTransaccionEntradaCredito';
    override type: string = NotaTransaccionEntradaCredito.type;

    @Prop.Set( PropBehavior.model, x => new NotaTransaccionEntrada( x ) ) declare documentoFuente?: NotaTransaccionEntrada;

    @Prop.Set() tasaInteresDiario: number = 0;
    @Prop.Set() importeInteres: number = 0;
    @Prop.Set() porcentajeInteres: number = 0;
    @Prop.Set() importeValorFinal: number = 0;

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

    @Prop.Set( PropBehavior.array, x => new NotaTransaccionEntradaCuota ) cuotas: NotaTransaccionEntradaCuota[] = [];

    @Prop.Set() duracionMinutos: number = 0;
    interesXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    amortizacionXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    cuotaXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    credito = new Credito();

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }


    constructor( item?: Partial<NotaTransaccionEntradaCredito> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaTransaccionEntradaCredito>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.cuotas.forEach( cuota => 
            cuota.set({
                credito: new NotaTransaccionEntradaCredito({ id: this.id, symbol: this.symbol })
            })
            .setRelation()
        );

        return this;
    }

    agregarCuota(cuota: NotaTransaccionEntradaCuota ): this {
        return this.credito.agregarCuota( this, cuota );
    }


    actualizarCuota(cuota: NotaTransaccionEntradaCuota ): this {
        return this.credito.actualizarCuota( this, cuota );
    }


    eliminarCuota(cuota: NotaTransaccionEntradaCuota ): this {
        return this.credito.eliminarCuota( this, cuota );
    }


    getCuota(cuota: NotaTransaccionEntradaCuota ): NotaTransaccionEntradaCuota {
        return this.credito.getCuota( this, cuota );
    }


    override procesarInformacion(): this {
        return this.credito.procesarInformacion( this );
    }


    procesarPagos( importeCobrado: number ): this
    {
        return this.credito.procesarPagos( this, importeCobrado );
    }
}