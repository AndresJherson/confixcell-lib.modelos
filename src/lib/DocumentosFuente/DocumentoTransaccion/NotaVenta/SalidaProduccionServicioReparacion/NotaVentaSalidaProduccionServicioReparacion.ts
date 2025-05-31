import Decimal from 'decimal.js';
import { NotaVenta, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo, NotaVentaSalidaProduccionServicioReparacionRecursoServicio, PantallaModelo, Prop, PropBehavior, SalidaProduccion, SalidaProduccionServicio, Servicio } from '../../../../../index';

@Prop.Class()
export class NotaVentaSalidaProduccionServicioReparacion extends SalidaProduccionServicio
{
    static override type: string = 'NotaVentaSalidaProduccionServicioReparacion';
    override type: string = NotaVentaSalidaProduccionServicioReparacion.type;

    @Prop.Set( PropBehavior.model, x => new NotaVenta( x ) ) declare documentoFuente?: NotaVenta;
    @Prop.Set( PropBehavior.model, x => new Servicio( x ) ) declare servicio?: Servicio;
    @Prop.Set( PropBehavior.model, x => new PantallaModelo( x ) ) pantallaModelo?: PantallaModelo;
    @Prop.Set() imei?: string;
    @Prop.Set() patron?: number;
    @Prop.Set() contrasena?: string;
    @Prop.Set( PropBehavior.text ) problema?: string;

    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo( x ) ) recursosBienConsumo: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo[] = [];
    @Prop.Set( PropBehavior.array, x => new NotaVentaSalidaProduccionServicioReparacionRecursoServicio( x ) ) recursosServicio: NotaVentaSalidaProduccionServicioReparacionRecursoServicio[] = [];


    constructor( item?: Partial<NotaVentaSalidaProduccionServicioReparacion> )
    {
        super();
        Prop.initialize( this, item );
    }


    override set(item: Partial<NotaVentaSalidaProduccionServicioReparacion>): this 
    {
        return super.set( item as Partial<this> );
    }


    override setRelation(): this 
    {
        super.setRelation();

        this.recursosServicio.forEach( recurso => 
            recurso.set({
                salidaProduccion: new NotaVentaSalidaProduccionServicioReparacion({ id: this.id, symbol: this.symbol })
            })
            .setRelation()
        );

        
        this.recursosBienConsumo.forEach( recurso => 
            recurso.set({
                salidaProduccion: new NotaVentaSalidaProduccionServicioReparacion({ id: this.id, symbol: this.symbol })
            })
            .setRelation()
        );


        return this;
    }


    override procesarInformacion(): this 
    {        
        try {
            this.importeValorNeto = this.recursosBienConsumo.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.procesarInformacion().importeValorNeto ),
                new Decimal( 0 )
            )
            .toNumber();

            this.importeValorNeto = this.recursosServicio.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importeValor ),
                new Decimal( this.importeValorNeto )
            )
            .toNumber();

        }
        catch ( error ) {
            this.importeValorNeto = 0;
        }
        
        
        // Importe precio neto es el importe adicional
        try {
            this.importePrecioNeto = this.recursosBienConsumo.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importePrecioNeto ),
                new Decimal( 0 )
            )
            .toNumber();

            this.importePrecioNeto = this.recursosServicio.reduce(
                ( decimal, recurso ) => decimal.plus( recurso.importePrecio ),
                new Decimal( this.importePrecioNeto )
            )
            .toNumber();
        }
        catch ( error ) {
            this.importePrecioNeto = 0;
        }

        return this;
    }


    // CRUD ARRAY de recursos
}