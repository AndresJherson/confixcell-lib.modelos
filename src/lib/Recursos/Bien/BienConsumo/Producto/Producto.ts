import { BienConsumo, Magnitud, ModelType, ProductoCategoria, ProductoMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class Producto extends BienConsumo {

    static override type = ModelType.Producto;
    override type = ModelType.Producto;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new ProductoMarca( x ) ) marca?: ProductoMarca;
    @Prop.Set( PropBehavior.model, x => new Magnitud( x ) ) magnitud?: Magnitud;
    @Prop.Set( PropBehavior.model, x => new ProductoCategoria( x ) ) categoria?: ProductoCategoria;

    override get nombreCompleto() {
        const nombreCompleto = `${this.nombre ?? ''} ${this.marca?.nombre ?? ''} ${this.magnitud?.nombre ?? ''}`.trim()
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: Partial<Producto> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<Producto> ): this {
        return super.set( item as Partial<this> );
    }
}