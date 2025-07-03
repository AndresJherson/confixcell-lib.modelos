import { Bien, BienConsumo, ModelType, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class BienCapital extends Bien {

    static override type = ModelType.BienCapital;
    override type = ModelType.BienCapital;

    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    @Prop.Set() numero?: number;
    @Prop.Set() descripcion?: string;

    override get nombreCompleto() {
        const nombre = this.bienConsumo?.nombreCompleto ?? '';
        const numero = !this.numero ? '' : this.numero.toString();
        const separator = nombre && numero ? ' - ' : '';

        const nombreCompleto = `${nombre}${separator}${numero}`.trim()
        return nombreCompleto ? nombreCompleto : undefined;
    }


    constructor( item?: Partial<BienCapital> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: Partial<BienCapital> ): this {
        return super.set( item as Partial<this> );
    }
}