import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, ExecutionContext, Model, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienRecursoBienConsumo extends Model {

    static override type = 'SalidaProduccionBienRecursoBienConsumo';
    override type = 'SalidaProduccionBienRecursoBienConsumo';
    private __SalidaProduccionBienRecursoBienConsumo!: 'SalidaProduccionBienRecursoBienConsumo';

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new SalidaProduccionBienActividad( x ) } ) actividad?: SalidaProduccionBienActividad | null;
    @Prop.Set() numero?: number | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;

    @Prop.Set() cantidad?: number | null;
    @Prop.Set() importeCostoUnitario?: number | null;
    @Prop.Set() importeCostoNeto?: number | null;

    get decimalCantidad(): Decimal { return Cast.toDecimal( this.cantidad ); }
    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }


    constructor( item?: OptionalModel<SalidaProduccionBienRecursoBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionBienRecursoBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionBienRecursoBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }

    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context )

        context.execute( this, SalidaProduccionBienRecursoBienConsumo.type, () => {

            this.actividad?.setRelation( context );
            
            this.almacen?.setRelation( context );

            this.bienConsumo?.setRelation( context );

        } );

        return this;
    }


    procesarInformacion(): this {
        try {

            this.importeCostoNeto = this.decimalImporteCostoUnitario
                .mul( this.decimalCantidad )
                .toNumber();

        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        return this;
    }
}