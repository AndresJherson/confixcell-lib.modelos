import { EntradaRecurso, ModelType, OptionalModel, Prop } from '../../../../index';

@Prop.Class()
export class EntradaEfectivo extends EntradaRecurso {

    static override type: string = ModelType.EntradaEfectivo;
    override type = ModelType.EntradaEfectivo;


    constructor( item?: OptionalModel<EntradaEfectivo> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<EntradaEfectivo>[] ): EntradaEfectivo[] {
        return data.map( item => new ( Prop.getClass<EntradaEfectivo>( item ) ?? EntradaEfectivo )( item ) )
    }
}