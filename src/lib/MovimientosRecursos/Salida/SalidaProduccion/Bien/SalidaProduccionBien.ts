import Decimal from 'decimal.js';
import { BienConsumo, Prop, PropBehavior, SalidaProduccion } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionBien extends SalidaProduccion
{
    static override type: string = 'SalidaProduccionBien';
    override type: string = SalidaProduccionBien.type;

    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;

    @Prop.Set() cantidadSaliente: number = 0;
    @Prop.Set() importeValorUnitario: number = 0;
    @Prop.Set() importePrecioUnitario: number = 0;

    get decimalCantidadSaliente(): Decimal {
        return Prop.toDecimal( this.cantidadSaliente );
    }
    get decimalImporteValorUnitario(): Decimal {
        return Prop.toDecimal( this.importeValorUnitario );
    }
    get decimalImportePrecioUnitario(): Decimal {
        return Prop.toDecimal( this.importePrecioUnitario );
    }

    @Prop.Set() cantidadEntrante: number = 0;
    get decimalCantidadEntrante(): Decimal {
        return Prop.toDecimal( this.cantidadEntrante );
    }
    
    get cantidadDisponible(): number {
        return this.decimalCantidadSaliente
            .minus( this.cantidadEntrante )
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
                importeValorNeto: this.decimalImporteValorUnitario
                    .mul( this.cantidadSaliente )
                    .toNumber(),
                importePrecioNeto: this.decimalImportePrecioUnitario
                    .mul( this.cantidadSaliente )
                    .toNumber()
            });

        }
        catch ( error ) {
            this.set({
                importeValorNeto: 0,
                importePrecioNeto: 0
            });
        }


        return this;
    }
}