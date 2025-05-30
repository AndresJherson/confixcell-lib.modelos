import { Bien, BienConsumo, Prop, PropBehavior } from '../../../../index';

@Prop.Class()
export class BienCapital extends Bien
{
    static override type = 'BienCapital';
    override type: string = BienCapital.type;

    @Prop.Set( PropBehavior.model, x => new BienConsumo( x ) ) bienConsumo?: BienConsumo;
    @Prop.Set() numero: number = 0;
    @Prop.Set() descripcion?: string;

    override get nombreCompleto() {
        const nombre = this.bienConsumo?.nombreCompleto ?? '';
        const numero = !this.numero ? '' : this.numero.toString();
        const separator = nombre && numero ? ' - ' : '';
        return `${nombre}${separator}${numero}`;
    }


    constructor( item?: Partial<BienCapital> )
    {
        super();
        Prop.initialize( this, item );
    }
}