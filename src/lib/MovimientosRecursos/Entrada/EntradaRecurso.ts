import { ModelType, MovimientoRecurso, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class EntradaRecurso extends MovimientoRecurso {

    static override type: string = ModelType.EntradaRecurso;
    override type: string = ModelType.EntradaRecurso;

    #importeValorNeto?: number | null | undefined;
    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }


    constructor( item?: OptionalModel<EntradaRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<EntradaRecurso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<EntradaRecurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize<TModel extends EntradaRecurso, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( EntradaRecurso, data );
    }
}