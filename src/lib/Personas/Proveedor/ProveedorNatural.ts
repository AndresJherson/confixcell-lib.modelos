import { Genero, Prop, PropBehavior, Proveedor } from '../../../index';

@Prop.Class()
export class ProveedorNatural extends Proveedor
{
    static override type = 'ProveedorNatural';
    override type: string = ProveedorNatural.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() apellido?: string;
    @Prop.Set( PropBehavior.model, x => new Genero( x ) ) genero?: Genero;
    @Prop.Set() domicilio?: string;
    @Prop.Set() celular?: number;
    @Prop.Set() celularRespaldo?: number;

    override get nombreCompleto() {
        const nombreCompleto = `${this.nombre ?? ''} ${this.apellido ?? ''}`.trim();
        return nombreCompleto ? nombreCompleto : undefined;
    }
    

    constructor( item?: Partial<ProveedorNatural> )
    {
        super();
        Prop.initialize( this, item );
    }
}