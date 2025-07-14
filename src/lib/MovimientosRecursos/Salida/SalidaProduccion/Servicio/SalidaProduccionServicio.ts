import { ExecutionContext, ModelType, OptionalModel, Prop, PropBehavior, SalidaProduccion, Servicio } from '../../../../../index';

@Prop.Class()
export class SalidaProduccionServicio extends SalidaProduccion {

    static override type = ModelType.SalidaProduccionServicio;
    override type = ModelType.SalidaProduccionServicio;

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => Servicio.initialize( [x] )[0] } ) servicio?: Servicio | null;


    constructor( item?: OptionalModel<SalidaProduccionServicio> ) {
        super()
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<SalidaProduccionServicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<SalidaProduccionServicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    override setRelation( context = new ExecutionContext() ): this {
        
        super.setRelation( context );

        context.execute( this, SalidaProduccionServicio.type, () => {

            this.servicio?.setRelation( context );

        } );

        return this;
    }


    static override initialize( data: OptionalModel<SalidaProduccionServicio>[] ): SalidaProduccionServicio[] {
        return data.map( item =>
            new (
                Prop.getClass<SalidaProduccionServicio>( item )
                ?? SalidaProduccionServicio
            )( item )
        )
    }
}