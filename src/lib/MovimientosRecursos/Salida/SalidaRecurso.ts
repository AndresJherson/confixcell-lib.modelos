import { MovimientoRecurso, Prop } from '../../../index';

@Prop.Class()
export class SalidaRecurso extends MovimientoRecurso {
    static override type: string = 'SalidaRecurso';
    override type: string = SalidaRecurso.type;

    constructor( item?: Partial<SalidaRecurso> ) {
        super()
        Prop.initialize( this, item );
    }


    static override initialize( data: Partial<SalidaRecurso>[] ): SalidaRecurso[] {
        return data.map( item => new ( Prop.GetClass<SalidaRecurso>( item ) ?? SalidaRecurso )( item ) )
    }
}