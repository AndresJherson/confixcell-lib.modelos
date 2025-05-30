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


    override set(item: Partial<EntradaEfectivo>): this {
        return super.set( item as Partial<this> );
    }


    override setRelation(keys?: {
        entradaEfectivoId: number
    }): this 
    {
        this.set({
            id: keys?.entradaEfectivoId ?? this.id
        });
        if ( keys?.entradaEfectivoId ) keys.entradaEfectivoId++;

        return this;        
    }
}