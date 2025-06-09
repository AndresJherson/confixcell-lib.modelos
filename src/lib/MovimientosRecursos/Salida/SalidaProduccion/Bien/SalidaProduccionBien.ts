import Decimal from 'decimal.js';
import { BienConsumo, Prop, PropBehavior, SalidaProduccion } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionBien extends SalidaProduccion
{
    static override type: string = 'SalidaProduccionBien';
    override type: string = SalidaProduccionBien.type;

    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;

    @Prop.Set() cantidadSaliente?: number;
    @Prop.Set() importeCostoUnitario?: number;
    @Prop.Set() importePrecioUnitario?: number;

    get decimalCantidadSaliente(): Decimal {
        return Prop.toDecimal( this.cantidadSaliente );
    }
    get decimalImporteCostoUnitario(): Decimal {
        return Prop.toDecimal( this.importeCostoUnitario );
    }
    get decimalImportePrecioUnitario(): Decimal {
        return Prop.toDecimal( this.importePrecioUnitario );
    }

    @Prop.Set() cantidadEntrante?: number;
    get decimalCantidadEntrante(): Decimal {
        return Prop.toDecimal( this.cantidadEntrante );
    }
    
    get cantidadDisponible(): number {
        return this.decimalCantidadSaliente
            .minus( this.cantidadEntrante ?? 0 )
            .toNumber();
    };
    get decimalCantidadDisponible(): Decimal {
        return Prop.toDecimal( this.cantidadDisponible );
    }
    

    constructor( item?: Partial<SalidaProduccionBien> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccionBien>): this 
    {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<SalidaProduccionBien>[] ): SalidaProduccionBien[]
    {
        return data.map( item => 
            new (
                Prop.GetClass<SalidaProduccionBien>( item )
                ?? SalidaProduccionBien
            ) ( item )
        )
    }


    // calcular valores netos
    override procesarInformacion(): this 
    {
        try {

            this.set({
                importeCostoNeto: this.decimalImporteCostoUnitario
                    .mul( this.cantidadSaliente ?? 0 )
                    .toNumber(),
                importePrecioNeto: this.decimalImportePrecioUnitario
                    .mul( this.cantidadSaliente ?? 0 )
                    .toNumber()
            });

        }
        catch ( error ) {
            this.set({
                importeCostoNeto: 0,
                importePrecioNeto: 0
            });
        }


        return this;
    }
}