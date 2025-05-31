import Decimal from 'decimal.js';
import { Credito, EntradaEfectivo, EntradaEfectivoCuota, ICredito, Prop, PropBehavior, Proporcion, TipoProporcion } from '../../../../index';

@Prop.Class()
export class EntradaEfectivoCredito extends EntradaEfectivo implements ICredito
{
    static override type: string = 'EntradaEfectivoCredito';
    override type: string = EntradaEfectivoCredito.type;

    @Prop.Set() tasaInteresDiario: number = 0;
    @Prop.Set() importeInteres: number = 0;
    @Prop.Set() porcentajeInteres: number = 0;
    @Prop.Set() importeValorFinal:number = 0;
    
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

    @Prop.Set( PropBehavior.array, x => new EntradaEfectivoCuota( x ) ) cuotas: EntradaEfectivoCuota[] = [];

    @Prop.Set() duracionMinutos: number = 0;
    interesXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    amortizacionXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    cuotaXminuto = new Proporcion( TipoProporcion.directa, 0, 0 );
    credito = new Credito();
    
    get decimalDuracionMinutos(): Decimal {
        return Prop.toDecimal( this.duracionMinutos );
    }


    constructor( item?: Partial<EntradaEfectivoCredito> )
    {
        super()
        Prop.initialize( this, item );
    }

    
    override set(item: Partial<EntradaEfectivoCredito>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.cuotas.forEach( cuota =>
            cuota.set({
                credito: new EntradaEfectivoCredito({ id: this.id, uuid: this.uuid, symbol: this.symbol })
            })
            .setRelation()
        );

        return this;
    }


    agregarCuota( cuota: EntradaEfectivoCuota ): this
    {
        return this.credito.agregarCuota( this, cuota );
    }


    actualizarCuota( cuota: EntradaEfectivoCuota ): this
    {
        return this.credito.actualizarCuota( this, cuota );
    }


    eliminarCuota( cuota: EntradaEfectivoCuota ): this
    {
        return this.credito.eliminarCuota( this, cuota );
    }


    getCuota( cuota: EntradaEfectivoCuota ): EntradaEfectivoCuota
    {
        return this.credito.getCuota( this, cuota );
    }
    

    override procesarInformacion(): this 
    {
        return this.credito.procesarInformacion( this );
    }


    procesarPagos( importeCobrado: number ): this
    {
        return this.credito.procesarPagos( this, importeCobrado );
    }
}