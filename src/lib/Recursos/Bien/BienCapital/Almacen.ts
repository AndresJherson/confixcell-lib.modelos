import { BienCapital, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class Almacen extends Model {

    static override type = ModelType.Almacen;
    override type = ModelType.Almacen;

    @Prop.Set() nombre?: string;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new BienCapital( x ) } ) bienCapital?: BienCapital;


    constructor( item?: OptionalModel<Almacen> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<Almacen> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Almacen> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, Almacen.type, () => {
            this.bienCapital?.setRelation( context );
        } );

        return this;
    }
}