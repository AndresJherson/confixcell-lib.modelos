import { EntradaRecurso, Prop } from '../../../../index';

@Prop.Class()
export class EntradaEfectivo extends EntradaRecurso
{
    static override type: string = 'EntradaEfectivo';
    override type: string = EntradaEfectivo.type;


    constructor( item?: Partial<EntradaEfectivo> )
    {
        super()
        Prop.initialize( this, item );    
    }


    static override initialize( data: Partial<EntradaEfectivo>[] ): EntradaEfectivo[]
    {
        return data.map( item => new ( Prop.GetClass<EntradaEfectivo>( item ) ?? EntradaEfectivo ) ( item ) )
    }
}