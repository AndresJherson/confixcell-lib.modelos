import { Prop, PropBehavior, SalidaProduccion, Servicio } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionServicio extends SalidaProduccion
{
    static override type: string = 'SalidaProduccionServicio';
    override type: string = SalidaProduccionServicio.type;
    
    @Prop.Set( PropBehavior.model, x => new Servicio( x ) ) servicio?: Servicio;
    

    constructor( item?: Partial<SalidaProduccionServicio> )
    {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<SalidaProduccionServicio>[] ): SalidaProduccionServicio[]
    {
        return data.map( item => 
            new (
                Prop.GetClass<SalidaProduccionServicio>( item )
                ?? SalidaProduccionServicio
            ) ( item )
        )
    }
}