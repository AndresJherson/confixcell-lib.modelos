import { ModelType, MovimientoRecurso, OptionalModel, Prop } from '../../../index';

@Prop.Class()
export class SalidaRecurso extends MovimientoRecurso {

    static override type = ModelType.SalidaRecurso;
    override type = ModelType.SalidaRecurso;

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


    static override initialize( data: OptionalModel<SalidaRecurso>[] ): Array<SalidaRecurso | null> {
        return Prop.arrayInitialize( SalidaRecurso, data );
    }


    override assign( item: OptionalModel<SalidaRecurso> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}