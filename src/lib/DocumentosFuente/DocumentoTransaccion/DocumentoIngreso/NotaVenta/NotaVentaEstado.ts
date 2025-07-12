import { Model, ModelType, OptionalModel, Prop } from '../../../../../index';

@Prop.Class()
export class NotaVentaEstado extends Model {

    static override type = ModelType.NotaVentaEstado;
    override type = ModelType.NotaVentaEstado;

    @Prop.Set() orden?: number;
    @Prop.Set() nombre?: string;
    @Prop.Set() colorHexadecimal?: string

    constructor( item?: OptionalModel<NotaVentaEstado> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaEstado> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaEstado> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}