import { Model, ModelType, OptionalModel, Prop } from '../../../../../index';

@Prop.Class()
export class NotaVentaPrioridad extends Model {

    static override type = ModelType.NotaVentaPrioridad;
    override type = ModelType.NotaVentaPrioridad;

    @Prop.Set() nombre?: string;

    constructor( item?: OptionalModel<NotaVentaPrioridad> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaPrioridad> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaPrioridad> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}