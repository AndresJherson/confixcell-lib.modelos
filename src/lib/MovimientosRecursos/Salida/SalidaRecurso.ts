import { ModelType, MovimientoRecurso, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class SalidaRecurso extends MovimientoRecurso {

    static override type = ModelType.SalidaRecurso;
    override type = ModelType.SalidaRecurso;

    constructor( item?: OptionalModel<SalidaRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaRecurso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<SalidaRecurso>[] ): SalidaRecurso[] {
        return data.map( item => new ( Prop.getClass<SalidaRecurso>( item ) ?? SalidaRecurso )( item ) )
    }


    override assign( item: OptionalModel<SalidaRecurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}