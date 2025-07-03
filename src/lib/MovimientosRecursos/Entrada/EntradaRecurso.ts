import { ModelType, MovimientoRecurso, Prop } from '../../../index';

@Prop.Class()
export class EntradaRecurso extends MovimientoRecurso {

    static override type: string = ModelType.EntradaRecurso;
    override type = ModelType.EntradaRecurso;


    constructor( item?: Partial<EntradaRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: Partial<EntradaRecurso> ): this {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<EntradaRecurso>[] ): EntradaRecurso[] {
        return data.map( item => new ( Prop.GetClass<EntradaRecurso>( item ) ?? EntradaRecurso )( item ) )
    }
}