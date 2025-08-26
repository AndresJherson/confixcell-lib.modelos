import { BienConsumo, ExecutionContext, Magnitud, ModelType, OptionalModel, ProductoCategoria, ProductoMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class Producto extends BienConsumo {

    static override type: string = ModelType.Producto;
    override type: string = ModelType.Producto;

    @Prop.Set() nombre?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new ProductoMarca( x ) } ) marca?: ProductoMarca | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Magnitud( x ) } ) magnitud?: Magnitud | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new ProductoCategoria( x ) } ) categoria?: ProductoCategoria | null;

    override get nombreCompleto() {
        const nombreCompleto = `${this.nombre ?? ''} ${this.marca?.nombre ?? ''} ${this.magnitud?.nombre ?? ''}`.trim()
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: OptionalModel<Producto> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Producto> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Producto> ): this {
        return super.assign( item as OptionalModel<this> );
    }

    
    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, Producto.type, () => {

            this.marca?.setRelation( context );
            this.magnitud?.setRelation( context );
            this.categoria?.setRelation( context );

        } );

        return this;
    }
}