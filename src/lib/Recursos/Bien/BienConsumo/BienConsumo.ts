import { Bien, ModelType, Prop } from '../../../../index';

@Prop.Class()
export class BienConsumo extends Bien {

    static override type = ModelType.BienConsumo;
    override type = ModelType.BienConsumo;


    constructor( item?: Partial<BienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }

    
    override set( item: Partial<BienConsumo> ): this {
        return super.set( item as Partial<this> );
    }


    static override initialize( data: Partial<BienConsumo>[] ): BienConsumo[] {
        return data.map( item => new ( Prop.GetClass<BienConsumo>( item ) ?? BienConsumo )( item ) )
    }
}