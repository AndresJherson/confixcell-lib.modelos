import { BienConsumo, Calidad, ExecutionContext, ModelType, OptionalModel, PantallaModelo, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModeloCalidad extends BienConsumo {

    static override type = ModelType.PantallaModeloCalidad;
    override type = ModelType.PantallaModeloCalidad;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new PantallaModelo( x ) } ) modelo?: PantallaModelo | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Calidad( x ) } ) calidad?: Calidad | null;
    @Prop.Set( { behavior: PropBehavior.boolean, getValue: () => true } ) override esSalida?: boolean | null = true;

    override get nombreCompleto() {
        const nombreCompleto = `${this.modelo?.nombreCompleto ?? ''} ${this.calidad?.nombre ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( json?: OptionalModel<PantallaModeloCalidad> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<PantallaModeloCalidad> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PantallaModeloCalidad> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, PantallaModeloCalidad.type, () => {

            this.modelo?.setRelation( context );
            this.calidad?.setRelation( context );

        } );

        return this;
    }
}