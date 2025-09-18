import { ExecutionContext, Model, ModelType, OptionalModel, PantallaMarca, Prop, PropBehavior } from "../../../../../index";

@Prop.Class()
export class PantallaModelo extends Model {

    static override type = 'PantallaModelo';
    override type = 'PantallaModelo';
    private __PantallaModelo!: 'PantallaModelo';

    @Prop.Set() nombre?: string | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new PantallaMarca( x ) } ) marca?: PantallaMarca | null;

    get nombreCompleto() {
        const nombreCompleto = `${this.marca?.nombre ?? ''} ${this.nombre ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }

    constructor( json?: OptionalModel<PantallaModelo> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<PantallaModelo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PantallaModelo> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, PantallaModelo.type, () => {
            this.marca?.setRelation( context );
        } );

        return this;
    }
}