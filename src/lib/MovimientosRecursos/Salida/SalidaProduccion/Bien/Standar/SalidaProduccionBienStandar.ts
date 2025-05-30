import Decimal from 'decimal.js';
import { Prop, PropBehavior, SalidaProduccionBien, SalidaProduccionBienActividad } from '../../../../../../index';

@Prop.Class()
export class SalidaProduccionBienStandar extends SalidaProduccionBien
{
    static override type: string = 'SalidaProduccionBienStandar';
    override type: string = SalidaProduccionBienStandar.type;

    @Prop.Set( PropBehavior.array, x => new SalidaProduccionBienActividad( x ) ) actividades: SalidaProduccionBienActividad[] = [];

    constructor( item?: Partial<SalidaProduccionBien> )
    {
        super()
        Prop.initialize( this, item );
    }


    override set(item: Partial<SalidaProduccionBien>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: 
        Parameters<SalidaProduccionBien['setRelation']>[0] &
        {
            salidaProduccionBienActividadId: number,
            salidaProduccionBienRecursoBienConsumoId: number
        }
    ): this 
    {
        super.setRelation( keys );

        this.actividades.forEach( act => {
            act.set({
                id: keys?.salidaProduccionBienActividadId ?? act.id,
                salidaProduccionBienStandar: new SalidaProduccionBienStandar({ id: this.id, symbol: this.symbol })
            })
            if ( keys?.salidaProduccionBienActividadId ) keys.salidaProduccionBienActividadId++;

            act.recursosBienConsumo.forEach( recurso => {
                recurso.set({
                    id: keys?.salidaProduccionBienRecursoBienConsumoId ?? recurso.id,
                    actividad: new SalidaProduccionBienActividad({ id: act.id, symbol: act.symbol })
                })
                if ( keys?.salidaProduccionBienRecursoBienConsumoId ) keys.salidaProduccionBienRecursoBienConsumoId++;
            } )
        } );

        return this;
    }


    // calcular valores unitarios
    override procesarInformacion(): this 
    {
        try {

            this.importeValorUnitario = this.actividades.reduce(
                ( decimal, actividad ) => decimal.plus( actividad.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeValorUnitario = 0;
        }

        super.procesarInformacion();

        return this;
    }

    // CRUD ARRAY actividades
}