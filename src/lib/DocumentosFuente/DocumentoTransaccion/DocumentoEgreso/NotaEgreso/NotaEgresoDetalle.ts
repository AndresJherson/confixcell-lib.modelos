import Decimal from 'decimal.js';
import { Cast, ExecutionContext, Model, ModelType, NotaEgreso, OptionalModel, Prop, PropBehavior, Recurso } from '../../../../../index';

@Prop.Class()
export class NotaEgresoDetalle extends Model {

    static override type = ModelType.NotaEgresoDetalle;
    override type = ModelType.NotaEgresoDetalle;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaEgreso( x ) } ) notaEgreso?: NotaEgreso | null;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Recurso.initialize( [x] )[0] } ) recurso?: Recurso | null;

    @Prop.Set() concepto?: string | null;
    @Prop.Set() cantidad?: number | null;
    @Prop.Set() importeUnitario?: number | null;
    @Prop.Set() importeBruto?: number | null;
    @Prop.Set() importeDescuento?: number | null;
    @Prop.Set() importeNeto?: number | null;
    @Prop.Set() comentario?: string | null;

    get decimalCantidad(): Decimal { return Cast.toDecimal( this.cantidad ); }
    get decimalImporteUnitario(): Decimal { return Cast.toDecimal( this.importeUnitario ); }
    get decimalImporteBruto(): Decimal { return Cast.toDecimal( this.importeBruto ); }
    get decimalImporteDescuento(): Decimal { return Cast.toDecimal( this.importeDescuento ); }
    get decimalImporteNeto(): Decimal { return Cast.toDecimal( this.importeNeto ); }


    constructor( item?: OptionalModel<NotaEgresoDetalle> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaEgresoDetalle> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaEgresoDetalle> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, NotaEgresoDetalle.type, () => {

            this.notaEgreso?.setRelation( context );

            this.recurso?.setRelation( context );

        } );

        return this;
    }


    procesarInformacion(): this {
        try {
            this.importeBruto = this.decimalCantidad
                .mul( this.importeUnitario ?? 0 )
                .toNumber();

            this.importeNeto = this.decimalImporteBruto
                .minus( this.importeDescuento ?? 0 )
                .toNumber();
        }
        catch ( error ) {
            this.importeBruto = 0;
            this.importeNeto = 0;
        }

        return this;
    }
}