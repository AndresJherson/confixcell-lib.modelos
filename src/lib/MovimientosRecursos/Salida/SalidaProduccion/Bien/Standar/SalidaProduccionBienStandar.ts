import Decimal from 'decimal.js';
import { Prop, PropBehavior, SalidaProduccionBien, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienStandar extends SalidaProduccionBien
{
    static override type: string = 'SalidaProduccionBienStandar';
    override type: string = SalidaProduccionBienStandar.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienActividad( x ) ) actividades?: SalidaProduccionBienActividad[];

    constructor( item?: Partial<SalidaProduccionBien> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccionBien>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.actividades?.forEach( act => 
            act.set({
                salidaProduccionBienStandar: new SalidaProduccionBienStandar({ id: this.id, uuid: this.uuid, symbol: this.symbol }),
                recursosBienConsumo: act.recursosBienConsumo?.map( recurso => 
                    recurso.set({
                        actividad: new SalidaProduccionBienActividad({ id: act.id, uuid: act.uuid, symbol: act.symbol })
                    })
                    .setRelation()
                )
            })
            .setRelation()
        );

        return this;
    }


    // calcular valores unitarios
    override procesarInformacion(): this 
    {
        try {

            this.importeCostoUnitario = this.actividades?.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().importeCostoNeto ?? 0 ),
                new Decimal( 0 )
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeCostoUnitario = 0;
        }

        super.procesarInformacion();

        return this;
    }

    // CRUD ARRAY actividades
}