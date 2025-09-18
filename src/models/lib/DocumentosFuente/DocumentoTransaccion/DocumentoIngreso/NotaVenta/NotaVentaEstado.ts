import { Model, ModelType, OptionalModel, Prop } from '../../../../../index';

@Prop.Class()
export class NotaVentaEstado extends Model {

    static override type = 'NotaVentaEstado';
    override type = 'NotaVentaEstado';
    private __NotaVentaEstado!: 'NotaVentaEstado';

    @Prop.Set() numero?: number | null;
    @Prop.Set() nombre?: string | null;
    @Prop.Set() colorHexadecimal?: string | null

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