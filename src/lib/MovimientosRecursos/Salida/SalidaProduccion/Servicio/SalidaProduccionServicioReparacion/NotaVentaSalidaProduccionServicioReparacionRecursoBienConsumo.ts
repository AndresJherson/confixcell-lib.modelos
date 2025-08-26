import Decimal from 'decimal.js';
import { Almacen, BienConsumo, Cast, ExecutionContext, Model, ModelType, NotaVentaSalidaProduccionServicioReparacion, OptionalModel, Prop, PropBehavior } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo extends Model {

    static override type: string = ModelType.NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo;
    override type: string = NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo.type;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaVentaSalidaProduccionServicioReparacion( x ) } ) salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion | null;
    @Prop.Set() numero?: number | null;

    @Prop.Set( { behavior: PropBehavior.datetime } ) fecha?: string | null;
    get dateTimeFecha(): DateTime { return Cast.toDateTime( this.fecha ); }

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new Almacen( x ) } ) almacen?: Almacen | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => BienConsumo.initialize( [x] )[0] } ) bienConsumo?: BienConsumo | null;
    @Prop.Set() cantidad?: number | null;
    @Prop.Set() importeCostoUnitario?: number | null;
    @Prop.Set() importeCostoNeto?: number | null;
    @Prop.Set() importeValorUnitario?: number | null;
    @Prop.Set() importeValorNeto?: number | null;

    get decimalCantidad(): Decimal { return Cast.toDecimal( this.cantidad ); }
    get decimalImporteCostoUnitario(): Decimal { return Cast.toDecimal( this.importeCostoUnitario ); }
    get decimalImporteCostoNeto(): Decimal { return Cast.toDecimal( this.importeCostoNeto ); }
    get decimalImporteValorUnitario(): Decimal { return Cast.toDecimal( this.importeValorUnitario ); }
    get decimalImporteValorNeto(): Decimal { return Cast.toDecimal( this.importeValorNeto ); }


    constructor( item?: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo> ): this {
        return super.assign( item as OptionalModel<this> );
    }

    
    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo.type, () => {

            this.salidaProduccion?.setRelation( context );

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

            this.importeValorNeto = this.decimalImporteValorUnitario
                .mul( this.decimalCantidad )
                .toNumber();
        }
        catch ( error ) {
            this.importeCostoNeto = 0;
            this.importeValorNeto = 0;
        }

        return this;
    }
}