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
    
    @Prop.Set() importeCostoNeto: number = 0;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionBienActividad> )
    {
        super();
        Prop.initialize( this, item );
    }


    procesarInformacion(): this
    {
        try {

            this.importeCostoNeto = this.recursosBienConsumo.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.procesarInformacion().importeCostoNeto ),
                new Decimal( 0 )
            ).toNumber();

            this.importeCostoNeto = this.recursosBienCapital.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeCostoNeto ),
                this.decimalImporteCostoNeto
            )
            .toNumber();

            this.importeCostoNeto = this.recursosServicio.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeCostoNeto ),
                this.decimalImporteCostoNeto
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        return this;
    }

    // CRUD ARRAY recursos
}