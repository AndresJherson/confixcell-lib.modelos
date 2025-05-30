import Decimal from 'decimal.js';
import { Model, NotaTransaccionEntrada, Prop, PropBehavior, Recurso } from '../../../../index';

@Prop.Class()
export class NotaTransaccionEntradaDetalle extends Model
{
    static override type: string = 'NotaTransaccionEntradaDetalle';
    override type: string = NotaTransaccionEntradaDetalle.type;
    
    @Prop.Set( PropBehavior.model, x => new NotaTransaccionEntrada( x ) ) notaTransaccionEntrada?: NotaTransaccionEntrada;
    @Prop.Set( PropBehavior.model, x => new Recurso( x ) ) recurso?: Recurso;
    
    @Prop.Set() concepto?: string;
    @Prop.Set() cantidad: number = 0;
    @Prop.Set() importeUnitario: number = 0;
    @Prop.Set() importeBruto: number = 0;
    @Prop.Set() importeDescuento: number = 0;
    @Prop.Set() importeNeto: number = 0;
    @Prop.Set( PropBehavior.text ) comentario?: string;

    get importeCantidad(): Decimal {
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


    constructor( item?: Partial<NotaTransaccionEntradaDetalle> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
        try {
            this.importeBruto = new Decimal( this.cantidad )
                .mul( this.importeUnitario )
                .toNumber();
    
            this.importeNeto = new Decimal( this.importeBruto )
                .minus( this.importeDescuento )
                .toNumber();
        }
        catch ( error ) {
            this.importeBruto = 0;
            this.importeNeto = 0;
        }

        return this;
    }
}