import Decimal from 'decimal.js';
import { BienCapital, Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioRecursoBienCapital extends Model {

    static override type = ModelType.SalidaProduccionServicioRecursoBienCapital;
    override type = ModelType.SalidaProduccionServicioRecursoBienCapital;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionServicioActividad( x ) } ) actividad?: SalidaProduccionServicioActividad | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new BienCapital( x ) } ) bienCapital?: BienCapital | null;

    @Prop.Set() importeCostoNeto?: number | null;
    get decimalImporteCostoNeto(): Decimal {
        return Cast.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: OptionalModel<SalidaProduccionServicioRecursoBienCapital> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionServicioRecursoBienCapital> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionServicioRecursoBienCapital> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, SalidaProduccionServicioRecursoBienCapital.type, () => {

            this.actividad?.setRelation( context );

            this.bienCapital?.setRelation( context );

        } );

        return this;
    }
}