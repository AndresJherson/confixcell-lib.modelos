import { Prop, Recurso } from "../../../index";

@Prop.Class()
export class Bien extends Recurso
{
    static override type = 'Bien';
    override type: string = Bien.type;
    

    constructor( json?: Partial<Bien> )
    {
        super();
        Prop.initialize( this, json );
    } 


    static override initialize( data: Partial<Bien>[] ): Bien[]
    {
        return data.map( item => new ( Prop.GetClass<Bien>( item ) ?? Bien ) ( item ) )
    }
}