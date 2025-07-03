import Decimal from 'decimal.js';
import { Credito, EntradaEfectivo, ICredito, NotaTransaccionEntrada, NotaEgresoCuota, Prop, PropBehavior, Proporcion, TipoProporcion } from '../../../../index';

@Prop.Class()
export class NotaEgresoCredito extends EntradaEfectivo implements ICredito
{
    static override type: string = 'NotaEgresoCredito';
    override type: string = NotaEgresoCredito.type;

    @Prop.Set( PropBehavior.model, x => new NotaTransaccionEntrada( x ) ) declare documentoFuente?: NotaTransaccionEntrada;

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

    @Prop.Set( PropBehavior.array, x => new NotaEgresoCuota( x ) ) cuotas?: NotaEgresoCuota[];

    @Prop.Set() duracionMinutos?: number;
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) interesXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) amortizacionXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Proporcion( TipoProporcion.directa, 0, 0 ) ) cuotaXminuto: Proporcion = new Proporcion( TipoProporcion.directa, 0, 0 );
    @Prop.Set( PropBehavior.object, x => new Credito() ) credito = new Credito();

    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }


    constructor( item?: Partial<NotaEgresoCredito> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaEgresoCredito>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.cuotas?.forEach( cuota => 
            cuota.set({
                credito: new NotaEgresoCredito({ id: this.id, symbol: this.symbol })
            })
            .setRelation()
        );

        return this;
    }

    agregarCuota(cuota: NotaEgresoCuota ): this {
        return this.credito.agregarCuota( this, cuota );
    }


    actualizarCuota(cuota: NotaEgresoCuota ): this {
        return this.credito.actualizarCuota( this, cuota );
    }


    eliminarCuota(cuota: NotaEgresoCuota ): this {
        return this.credito.eliminarCuota( this, cuota );
    }


    getCuota(cuota: NotaEgresoCuota ): NotaEgresoCuota | undefined {
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