import { Model, ModelType, Prop } from '../../../index';

@Prop.Class()
export class Rol extends Model {

    static override type: string = ModelType.Rol;
    override type: string = ModelType.Rol;

    @Prop.Set() nombre?: string;


    constructor( item?: Partial<Rol> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<Rol> ): this {
        return super.set( item as Partial<this> );
    }
}