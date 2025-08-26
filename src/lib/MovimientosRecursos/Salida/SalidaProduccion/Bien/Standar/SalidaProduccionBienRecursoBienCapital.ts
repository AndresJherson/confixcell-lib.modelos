import Decimal from 'decimal.js';
import { BienCapital, Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoBienCapital extends Model {

    static override type: string = ModelType.SalidaProduccionBienRecursoBienCapital;
    override type: string = ModelType.SalidaProduccionBienRecursoBienCapital;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionBienActividad( x ) } ) actividad?: SalidaProduccionBienActividad | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new BienCapital( x ) } ) bienCapital?: BienCapital | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }


    constructor( item?: OptionalModel<SalidaProduccionBienRecursoBienCapital> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBienRecursoBienCapital> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBienRecursoBienCapital> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaProduccionBienRecursoBienCapital.type, () => {

            this.actividad?.setRelation( context );

            this.bienCapital?.setRelation( context );

        } );

        return this;
    }
}