import { Model, ModelType, Prop } from '../../index';

@Prop.Class()
export class DocumentoIdentificacion extends Model {

    static override type: string = ModelType.DocumentoIdentificacion;
    override type: string = ModelType.DocumentoIdentificacion;

    @Prop.Set() nombre?: string;

    
    constructor( item?: Partial<DocumentoIdentificacion> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<DocumentoIdentificacion> ): this {
        return super.set( item as Partial<this> );
    }
}