import Decimal from 'decimal.js';
import { Model, Prop, PropBehavior, SalidaProduccionServicioRecursoBienCapital, SalidaProduccionServicioRecursoBienConsumo, SalidaProduccionServicioRecursoServicio, SalidaProduccionServicioStandar } from '../../../../../../index';
import { DateTime } from 'luxon';

@Prop.Class()
export class SalidaProduccionServicioActividad extends Model
{
    static override type: string = 'SalidaProduccionServicioActividad';
    override type: string = SalidaProduccionServicioActividad.type;

    @Prop.Set( PropBehavior.model, x => new SalidaProduccionServicioStandar( x ) ) salidaProduccionServicioStandar?: SalidaProduccionServicioStandar;
    @Prop.Set() nombre?: string;
    
    @Prop.Set( PropBehavior.datetime ) fechaInicio?: string;
    @Prop.Set( PropBehavior.datetime ) fechaFinal?: string;
    
    get dateTimeInicio(): DateTime {
        return Prop.toDateTime( this.fechaInicio );
    }
    get dateTimeFinal(): DateTime {
        return Prop.toDateTime( this.fechaFinal );
    }

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoBienConsumo( x ) ) recursosBienConsumo: SalidaProduccionServicioRecursoBienConsumo[] = [];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoBienCapital( x ) ) recursosBienCapital: SalidaProduccionServicioRecursoBienCapital[] = [];
    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioRecursoServicio( x ) ) recursosServicio: SalidaProduccionServicioRecursoServicio[] = [];
    
    @Prop.Set() importeValorNeto: number = 0;
    get decimalImporteValorNeto(): Decimal {
        return Prop.toDecimal( this.importeValorNeto );
    }


    constructor( item?: Partial<SalidaProduccionServicioActividad> )
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