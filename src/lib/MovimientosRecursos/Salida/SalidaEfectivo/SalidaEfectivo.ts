import { ModelType, OptionalModel, Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaEfectivo extends SalidaRecurso {

    static override type = ModelType.SalidaEfectivo;
    override type = ModelType.SalidaEfectivo;

    @Prop.Set() override importeValorNeto?: number;

    constructor( item?: OptionalModel<SalidaEfectivo> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: OptionalModel<SalidaEfectivo>[] ): SalidaEfectivo[] {
        return data.map( item => new ( Prop.getClass<SalidaEfectivo>( item ) ?? SalidaEfectivo )( item ) )
    }


    override set( item: OptionalModel<SalidaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}