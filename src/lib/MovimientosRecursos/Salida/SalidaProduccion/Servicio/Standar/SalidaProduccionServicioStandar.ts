import Decimal from 'decimal.js';
import { Prop, PropBehavior, SalidaProduccionServicio, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioStandar extends SalidaProduccionServicio
{
    static override type: string = 'SalidaProduccionServicioStandar';
    override type: string = SalidaProduccionServicioStandar.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioActividad( x ) ) actividades: SalidaProduccionServicioActividad[] = [];

    constructor( item?: Partial<SalidaProduccionServicioStandar> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccionServicioStandar>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: 
        Parameters<SalidaProduccionServicio['setRelation']>[0] &
        {
            salidaProduccionServicioActividadId: number,
            salidaProduccionServicioRecursoBienConsumoId: number
        }
    ): this 
    {
        super.setRelation( keys );

        this.actividades.forEach( act => {
            act.set({
                id: keys?.salidaProduccionServicioActividadId ?? act.id,
                salidaProduccionServicioStandar: new SalidaProduccionServicioStandar({ id: this.id, symbol: this.symbol })
            })
            if ( keys?.salidaProduccionServicioActividadId ) keys.salidaProduccionServicioActividadId++;

            act.recursosBienConsumo.forEach( recurso => {
                recurso.set({
                    id: keys?.salidaProduccionServicioRecursoBienConsumoId ?? recurso.id,
                    actividad: new SalidaProduccionServicioActividad({ id: act.id, symbol: act.symbol })
                })
                if ( keys?.salidaProduccionServicioRecursoBienConsumoId ) keys.salidaProduccionServicioRecursoBienConsumoId++;
            } )
        } );

        return this;
    }


    // calcular valores netos
    override procesarInformacion(): this 
    {
        try {

            this.importeValorNeto = this.actividades.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeValorNeto = 0;
        }

        super.procesarInformacion();

        return this;
    }


    // CRUD ARRAY actividades
}