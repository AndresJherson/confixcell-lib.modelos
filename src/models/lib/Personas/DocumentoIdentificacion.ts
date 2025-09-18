import { Model, ModelType, OptionalModel, Prop } from '../../index';

@Prop.Class()
export class DocumentoIdentificacion extends Model {

    static override type = 'DocumentoIdentificacion';
    override type = 'DocumentoIdentificacion';
    private __DocumentoIdentificacion!: 'DocumentoIdentificacion';

    @Prop.Set() nombre?: string | null;

    
    constructor( item?: OptionalModel<DocumentoIdentificacion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<DocumentoIdentificacion> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<DocumentoIdentificacion> ): this {
        return super.assign( item as OptionalModel<this> );
    }
}