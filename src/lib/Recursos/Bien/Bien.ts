import Decimal from "decimal.js";
import { ModelType, Prop, Recurso } from "../../../index";

@Prop.Class()
export class Bien extends Recurso {

    static override type = ModelType.Bien;
    override type = ModelType.Bien;

    @Prop.Set() precioUnitario?: number;
    get decimalPrecioUnitario(): Decimal {
        return Prop.toDecimal( this.precioUnitario );
    }


    constructor( json?: Partial<Bien> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<Bien> ): this {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<Bien>[] ): Bien[] {
        return data.map( item => new ( Prop.GetClass<Bien>( item ) ?? Bien )( item ) )
    }
}