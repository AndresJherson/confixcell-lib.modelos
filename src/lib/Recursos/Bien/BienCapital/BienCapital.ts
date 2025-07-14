import { Bien, BienConsumo, ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class BienCapital extends Bien {

    static override type = ModelType.BienCapital;
    override type = ModelType.BienCapital;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new BienConsumo( x ) } ) bienConsumo?: BienConsumo | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set() descripcion?: string | null;

    override get nombreCompleto() {
        const nombre = this.bienConsumo?.nombreCompleto ?? '';
        const numero = !this.numero ? '' : this.numero.toString();
        const separator = nombre && numero ? ' - ' : '';

        const nombreCompleto = `${nombre}${separator}${numero}`.trim()
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( item?: OptionalModel<BienCapital> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<BienCapital> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<BienCapital> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, BienCapital.type, () => {
            this.bienConsumo?.setRelation( context );
        } );

        return this;
    }
}