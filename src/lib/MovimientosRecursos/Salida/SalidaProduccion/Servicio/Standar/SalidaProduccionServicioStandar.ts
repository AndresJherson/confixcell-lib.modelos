import Decimal from 'decimal.js';
import { Prop, PropBehavior, SalidaProduccionServicio, SalidaProduccionServicioActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionServicioStandar extends SalidaProduccionServicio
{
    static override type: string = 'SalidaProduccionServicioStandar';
    override type: string = SalidaProduccionServicioStandar.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionServicioActividad( x ) ) actividades?: SalidaProduccionServicioActividad[];

    constructor( item?: Partial<SalidaProduccionServicioStandar> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccionServicioStandar>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.actividades?.forEach( act => 
            act.set({
                salidaProduccionServicioStandar: new SalidaProduccionServicioStandar({ id: this.id, uuid: this.uuid, symbol: this.symbol }),
                recursosBienConsumo: act.recursosBienConsumo?.map( recurso => 
                    recurso.set({
                        actividad: new SalidaProduccionServicioActividad({ id: act.id, uuid: act.uuid, symbol: act.symbol })
                    })
                    .setRelation()
                )
            })
            .setRelation()
        );

        return this;
    }


    // calcular valores netos
    override procesarInformacion(): this 
    {
        try {

            this.importeCostoNeto = this.actividades?.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().importeCostoNeto ?? 0 ),
                new Decimal( 0 )
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeCostoNeto = 0;
        }

        super.procesarInformacion();

        return this;
    }


    // CRUD ARRAY actividades
}