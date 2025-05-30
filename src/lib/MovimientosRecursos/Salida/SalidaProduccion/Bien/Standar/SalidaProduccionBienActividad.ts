import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionBienRecursoBienCapital, SalidaProduccionBienRecursoBienConsumo, SalidaProduccionBienRecursoServicio, SalidaProduccionBienStandar } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class SalidaProduccionBienActividad extends Model
{
    static override type: string = 'SalidaProduccionBienActividad';
    override type: string = SalidaProduccionBienActividad.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionBienStandar( x ) ) salidaProduccionBienStandar?: SalidaProduccionBienStandar;
    @Prop.Set() nombre?: string;
    
    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaFinal?: string;
    
    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
    }
    
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoBienConsumo( x ) ) recursosBienConsumo: SalidaProduccionBienRecursoBienConsumo[] = [];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoBienCapital( x ) ) recursosBienCapital: SalidaProduccionBienRecursoBienCapital[] = [];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienRecursoServicio( x ) ) recursosServicio: SalidaProduccionBienRecursoServicio[] = [];
    
    @Prop.Set() importeValorNeto: number = 0;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }


    constructor( item?: Partial<SalidaProduccionBienActividad> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
        try {

            this.importeValorNeto = this.recursosBienConsumo.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            ).toNumber();

            this.importeValorNeto = this.recursosBienCapital.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeValor ),
                this.decimalImporteValorNeto
            )
            .toNumber();

            this.importeValorNeto = this.recursosServicio.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeValor ),
                this.decimalImporteValorNeto
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeValorNeto = 0;
        }

        return this;
    }

    // CRUD ARRAY recursos
}