import { BienCapital, Model, ModelType, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class Almacen extends Model {

    static override type = ModelType.Almacen;
    override type = ModelType.Almacen;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new BienCapital( x ) ) bienCapital?: BienCapital;


    constructor( item?: Partial<Almacen> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<Almacen> ): this {
        return super.set( item as Partial<this> );
    }
}