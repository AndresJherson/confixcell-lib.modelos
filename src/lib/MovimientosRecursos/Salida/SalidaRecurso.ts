import { ModelType, MovimientoRecurso, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class SalidaRecurso extends MovimientoRecurso {

    static override type: string = ModelType.SalidaRecurso;
    override type: string = ModelType.SalidaRecurso;

    #importeValorNeto?: number | null | undefined;

    @Prop.Set()
    public override get importeValorNeto(): number | null | undefined { return this.#importeValorNeto; }
    public override set importeValorNeto( value: number | null | undefined ) { this.#importeValorNeto = value; }


    constructor( item?: OptionalModel<SalidaRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaRecurso> ): this {
        return super.set( item as OptionalModel<this> );
    }


    static override initialize<TModel extends SalidaRecurso, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( SalidaRecurso, data );
    }


    override assign( item: OptionalModel<SalidaRecurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}