import { BienConsumo, Calidad, ModelType, PantallaModelo, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModeloCalidad extends BienConsumo {

    static override type = ModelType.PantallaModeloCalidad;
    override type = ModelType.PantallaModeloCalidad;

    @Prop.Set( PropBehavior.model, x => new PantallaModelo( x ) ) modelo?: PantallaModelo;
    @Prop.Set( PropBehavior.model, x => new Calidad( x ) ) calidad?: Calidad;
    @Prop.Set( PropBehavior.boolean, () => true ) override esSalida?: boolean = true;

    override get nombreCompleto() {
        const nombreCompleto = `${this.modelo?.nombreCompleto ?? ''} ${this.calidad?.nombre ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: Partial<PantallaModeloCalidad> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: Partial<PantallaModeloCalidad> ): this {
        return super.set( item as Partial<this> );
    }
}