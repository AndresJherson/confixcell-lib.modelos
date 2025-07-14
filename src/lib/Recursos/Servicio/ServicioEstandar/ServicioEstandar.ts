import Decimal from "decimal.js";
import { Cast, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, Recurso, ServicioEstandarCategoria } from "../../../../index";

@Prop.Class()
export class ServicioEstandar extends Recurso {

    static override type = ModelType.ServicioEstandar;
    override type = ModelType.ServicioEstandar;

    @Prop.Set() nombre?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new ServicioEstandarCategoria( x ) } ) categoria?: ServicioEstandarCategoria | null;

    override get nombreCompleto() {
        return this.nombre;
    }

    @Prop.Set() precioUnitario?: number | null;
    get decimalPrecioUnitario(): Decimal { return Cast.toDecimal( this.precioUnitario ); }


    constructor( json?: OptionalModel<ServicioEstandar> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<ServicioEstandar> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<ServicioEstandar> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, ServicioEstandar.type, () => {
            this.categoria?.setRelation( context );
        } );

        return this;
    }
}