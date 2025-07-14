import Decimal from 'decimal.js';
import { Cast, ModelType, OptionalModel, Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaProduccion extends SalidaRecurso {

    static override type = ModelType.SalidaProduccion;
    override type = ModelType.SalidaProduccion;

    @Prop.Set() importeCostoNeto?: number | null;
    @Prop.Set() override importeValorNeto?: number | null;

    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }

    constructor( item?: OptionalModel<SalidaProduccion> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccion> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<SalidaProduccion>[] ): SalidaProduccion[] {
        return data.map( item => new ( Prop.getClass<SalidaProduccion>( item ) ?? SalidaProduccion )( item ) )
    }
}