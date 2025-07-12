import Decimal from "decimal.js";
import { Cast, ModelType, OptionalModel, Prop, Recurso } from "../../../index";

@Prop.Class()
export class Bien extends Recurso {

    static override type = ModelType.Bien;
    override type = ModelType.Bien;

    @Prop.Set() precioUnitario?: number;
    get decimalPrecioUnitario(): Decimal { return Cast.toDecimal( this.precioUnitario ); }


    constructor( json?: OptionalModel<Bien> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Bien> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Bien> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize( data: OptionalModel<Bien>[] ): Bien[] {
        return data.map( item => new ( Prop.getClass<Bien>( item ) ?? Bien )( item ) )
    }
}