import { Prop, Proveedor } from '../../../index';

@Prop.Class()
export class ProveedorJuridico extends Proveedor
{
    static override type = 'ProveedorJuridico';
    override type: string = ProveedorJuridico.type;

    @Prop.Set() nombre?: string;
    @Prop.Set() domicilio?: string;    
    @Prop.Set() celular?: number;

    override get nombreCompleto() {
        return this.nombre ?? '';
    }


    constructor( item?: Partial<ProveedorJuridico> )
    {
        super();
        Prop.initialize( this, item );
    }
}