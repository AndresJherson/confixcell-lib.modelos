import { ModelType, OptionalModel, Prop, Recurso } from "../../../index";

@Prop.Class()
export class Servicio extends Recurso {

    static override type = 'Servicio';
    override type = 'Servicio';
    private __Servicio!: 'Servicio';


    constructor( json?: OptionalModel<Servicio> ) {
        super();
        Prop.initialize( this, json );
    }


    override set( item: OptionalModel<Servicio> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<Servicio> ): this {
        return super.assign( item as OptionalModel<this> );
    }


    static override initialize<TItem extends Servicio, TArray extends OptionalModel<TItem>>( data: TArray[] ) {
        return Prop.arrayInitialize( Servicio, data );
    }
}