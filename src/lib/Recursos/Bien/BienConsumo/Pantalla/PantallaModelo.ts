import { Model, ModelType, PantallaMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModelo extends Model {

    static override type = ModelType.PantallaModelo;
    override type = ModelType.PantallaModelo;

    @Prop.Set() nombre?: string;
    @Prop.Set( PropBehavior.model, x => new PantallaMarca( x ) ) marca?: PantallaMarca;

    get nombreCompleto() {
        const nombreCompleto = `${this.marca?.nombre ?? ''} ${this.nombre ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }

    constructor( json?: Partial<PantallaModelo> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<PantallaModelo> ): this {
        return super.set( item as Partial<this> );
    }
}