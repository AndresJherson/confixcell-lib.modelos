import Decimal from 'decimal.js';
import { Model, NotaTransaccionSalida, Prop, PropBehavior, Recurso } from '../../../../index';

@Prop.Class()
export class NotaTransaccionSalidaDetalle extends Model
{
    static override type: string = 'NotaTransaccionSalidaDetalle';
    override type: string = NotaTransaccionSalidaDetalle.type;
    
    @Prop.Set( PropBehavior.model, x => new NotaTransaccionSalida( x ) ) notaTransaccionSalida?: NotaTransaccionSalida;
    @Prop.Set( PropBehavior.model, x => new Recurso( x ) ) recurso?: Recurso;
    @Prop.Set() concepto?: string;
    @Prop.Set() cantidad?: number;
    @Prop.Set() importeUnitario?: number;
    @Prop.Set() importeBruto?: number;
    @Prop.Set() importeDescuento?: number;
    @Prop.Set() importeNeto?: number;
    @Prop.Set() comentario?: string;

    get decimalCantidad(): Decimal {
        return Prop.toDecimal( this.cantidad );
    }
    get decimalImporteUnitario(): Decimal {
        return Prop.toDecimal( this.importeUnitario );
    }
    get decimalImporteBruto(): Decimal {
        return Prop.toDecimal( this.importeBruto );
    }
    get decimalImporteDescuento(): Decimal {
        return Prop.toDecimal( this.importeDescuento );
    }
    get decimalImporteNeto(): Decimal {
        return Prop.toDecimal( this.importeNeto );
    }


    constructor( item?: Partial<NotaTransaccionSalidaDetalle> )
    {
        super();
        Prop.initialize( this, item );
    }

 
    procesarInformacion(): this
    {
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