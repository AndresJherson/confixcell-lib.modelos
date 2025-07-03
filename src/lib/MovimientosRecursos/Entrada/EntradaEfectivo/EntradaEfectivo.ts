import Decimal from 'decimal.js';
import { EntradaRecurso, ModelType, Prop } from '../../../../index';

@Prop.Class()
export class EntradaEfectivo extends EntradaRecurso {

    static override type: string = ModelType.EntradaEfectivo;
    override type = ModelType.EntradaEfectivo;

    @Prop.Set() override importeValorNeto?: number;


    constructor( item?: Partial<EntradaEfectivo> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<EntradaEfectivo> ): this {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<EntradaEfectivo>[] ): EntradaEfectivo[] {
        return data.map( item => new ( Prop.GetClass<EntradaEfectivo>( item ) ?? EntradaEfectivo )( item ) )
    }
}