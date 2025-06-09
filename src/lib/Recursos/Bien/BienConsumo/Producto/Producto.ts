import { BienConsumo, Magnitud, ProductoCategoria, ProductoMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class Producto extends BienConsumo
{
    static override type = 'Producto';
    override type: string = Producto.type;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new ProductoMarca( x ) ) marca?: ProductoMarca;
    @Prop.Set( PropBehavior.model, x => new Magnitud( x ) ) magnitud?: Magnitud;
    @Prop.Set( PropBehavior.model, x => new ProductoCategoria( x ) ) categoria?: ProductoCategoria;

    override get nombreCompleto()
    {
        const nombreCompleto = `${this.nombre ?? ''} ${this.marca?.nombre ?? ''} ${this.magnitud?.nombre ?? ''}`.trim()
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: Partial<Producto> )
    {
        super();
        Prop.initialize( this, json );
    }
}