import Decimal from 'decimal.js';
import { Cast, ModelType, OptionalModel, Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaProduccion extends SalidaRecurso {

    static override type = ModelType.SalidaProduccion;
    override type = ModelType.SalidaProduccion;

    #importeCostoNeto?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    
    @Prop.Set()
    public get importeCostoNeto(): number | null | undefined {return this.#importeCostoNeto;}
    public set importeCostoNeto( value: number | null | undefined ) {this.#importeCostoNeto = value;}

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }

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