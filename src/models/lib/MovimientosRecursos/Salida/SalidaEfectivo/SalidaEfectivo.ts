import { ModelType, OptionalModel, Prop, SalidaRecurso } from '../../../../index';

@Prop.Class()
export class SalidaEfectivo extends SalidaRecurso {

    static override type = 'SalidaEfectivo';
    override type = 'SalidaEfectivo';
    private __SalidaEfectivo!: 'SalidaEfectivo';


    constructor( item?: OptionalModel<SalidaEfectivo> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize<TModel extends SalidaEfectivo, TItem extends OptionalModel<TModel>>( data: TItem[] ) {
        return Prop.arrayInitialize( SalidaEfectivo, data );
    }


    override set( item: OptionalModel<SalidaEfectivo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaEfectivo> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}