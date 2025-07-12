import Decimal from 'decimal.js';
import { Cast, ExecutionContext, Model, ModelType, NotaIngreso, OptionalModel, Prop, PropBehavior, Recurso } from '../../../../../index';

@Prop.Class()
export class NotaIngresoDetalle extends Model {

    static override type = ModelType.NotaIngresoDetalle;
    override type = ModelType.NotaIngresoDetalle;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => new NotaIngreso( x ) } ) notaIngreso?: NotaIngreso;
    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Recurso.initialize( [x] )[0] } ) recurso?: Recurso;
    @Prop.Set() concepto?: string;
    @Prop.Set() cantidad?: number;
    @Prop.Set() importeUnitario?: number;
    @Prop.Set() importeBruto?: number;
    @Prop.Set() importeDescuento?: number;
    @Prop.Set() importeNeto?: number;
    @Prop.Set() comentario?: string;

    get decimalCantidad(): Decimal { return Cast.toDecimal( this.cantidad ); }
    get decimalImporteUnitario(): Decimal { return Cast.toDecimal( this.importeUnitario ); }
    get decimalImporteBruto(): Decimal { return Cast.toDecimal( this.importeBruto ); }
    get decimalImporteDescuento(): Decimal { return Cast.toDecimal( this.importeDescuento ); }
    get decimalImporteNeto(): Decimal { return Cast.toDecimal( this.importeNeto ); }


    constructor( item?: OptionalModel<NotaIngresoDetalle> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<NotaIngresoDetalle> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<NotaIngresoDetalle> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {

        super.setRelation( context );

        context.execute( this, NotaIngresoDetalle.type, () => {
            
            this.notaIngreso?.setRelation( context );

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