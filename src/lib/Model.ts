import { ExecutionContext, ModelType, OptionalModel, Prop } from '../index';

@Prop.Class()
export class Model {

    static type: string = ModelType.Model;
    type: string = ModelType.Model;

    @Prop.Set() symbol: symbol = Symbol();
    @Prop.Set() id?: number | null;
    @Prop.Set() uuid?: string | null;


    constructor( item?: OptionalModel<Model> ) {
        Prop.initialize( this, item );
    }


    set( item: OptionalModel<this> ): this {
        Prop.set( this, item );
        return this;
    }


    assign( item: OptionalModel<this> ): this {
        Prop.assign( this, item );
        return this;
    }


    setRelation( context = new ExecutionContext() ): this {
        return this;
    }


    isSameIdentity( item: this ): boolean {
        return item.symbol === this.symbol
            ? true
            : ( item.uuid && this.uuid ) &&
                ( item.uuid === this.uuid )
                ? true
                : false;
    }
}