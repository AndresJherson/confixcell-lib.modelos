import { BienConsumo, Calidad, PantallaModelo, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModeloCalidad extends BienConsumo
{
    static override type = 'PantallaModeloCalidad';
    override type: string = PantallaModeloCalidad.type;

    @Prop.Set( PropBehavior.model, x => new PantallaModelo( x ) ) modelo?: PantallaModelo;
    @Prop.Set( PropBehavior.model, x => new Calidad( x ) ) calidad?: Calidad;
    @Prop.Set( PropBehavior.boolean, () => true ) override esSalida: boolean = true;
    
    override get nombreCompleto()
    {
        return `${this.modelo?.nombreCompleto ?? ''} ${this.calidad?.nombre ?? ''}`.trim();
    }


    constructor( json?: Partial<PantallaModeloCalidad> )
    {
        super();
        Prop.initialize( this, json );
    }
}