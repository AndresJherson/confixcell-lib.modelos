import Decimal from "decimal.js";
import { ModelType, Prop, PropBehavior, Recurso, ServicioEstandarCategoria } from "../../../../index";

@Prop.Class()
export class ServicioEstandar extends Recurso {

    static override type = ModelType.ServicioEstandar;
    override type = ModelType.ServicioEstandar;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new ServicioEstandarCategoria( x ) ) categoria?: ServicioEstandarCategoria;

    override get nombreCompleto() {
        return this.nombre;
    }

    @Prop.Set() precioUnitario?: number;
    get decimalPrecioUnitario(): Decimal {
        return Prop.toDecimal( this.precioUnitario );
    }


    constructor( json?: Partial<ServicioEstandar> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<ServicioEstandar> ): this {
        return super.set( item as Partial<this> );
    }
}