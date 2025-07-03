import Decimal from 'decimal.js';
import { Credito, Cuota, EntradaEfectivo, EntradaEfectivoCuota, ICredito, ModelType, Prop, PropBehavior, Proporcion, TipoProporcion } from '../../../../index';

@Prop.Class()
// export class EntradaEfectivoCredito extends EntradaEfectivo implements ICredito {
export class EntradaEfectivoCredito extends Credito( EntradaEfectivo ) {

    static override type: string = ModelType.EntradaEfectivoCredito;
    override type = ModelType.EntradaEfectivoCredito;

    @Prop.Set() override tasaInteresDiario?: number;
    @Prop.Set() override importeInteres?: number;
    @Prop.Set() override porcentajeInteres?: number;
    @Prop.Set() override importeValorFinal?: number;

    @Prop.Set( PropBehavior.array, x => new EntradaEfectivoCuota( x ) ) override cuotas?: EntradaEfectivoCuota[];


    constructor( item?: Partial<EntradaEfectivoCredito> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<EntradaEfectivoCredito> ): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this {
        super.setRelation();

        this.cuotas?.forEach( cuota =>
            cuota.set( {
                credito: new EntradaEfectivoCredito( { id: this.id, uuid: this.uuid, symbol: this.symbol } )
            } )
                .setRelation()
        );

        return this;
    }
}

