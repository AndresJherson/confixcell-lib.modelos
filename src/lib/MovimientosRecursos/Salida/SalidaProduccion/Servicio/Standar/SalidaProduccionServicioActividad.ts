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
    
    @Prop.Set() importeCostoNeto: number = 0;
    get decimalImporteCostoNeto(): Decimal {
        return Prop.toDecimal( this.importeCostoNeto );
    }


    constructor( item?: Partial<SalidaProduccionServicioActividad> )
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