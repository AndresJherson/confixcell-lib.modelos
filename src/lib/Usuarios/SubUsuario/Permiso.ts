import { Model, ModelType, Prop } from '../../../index';

@Prop.Class()
export class Permiso extends Model {

    static override type: string = ModelType.Permiso;
    override type: string = ModelType.Permiso;

    @Prop.Set() nombre?: string;
    @Prop.Set() descripcion?: string;


    constructor( item?: Partial<Permiso> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<Permiso> ): this {
        return super.set( item as Partial<this> );
    }
}