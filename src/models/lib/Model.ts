import { Cast, ExecutionContext, OptionalModel, Prop } from '../index';
import { Immutable, UtilImmutable } from '../utils/Immutable';

@Prop.Class()
export class Model extends Immutable {

    static override type = 'Model';
    override type = 'Model';
    private __Model!: 'Model';

    @Prop.Set() symbol: symbol = Symbol();
    @Prop.Set() uuid?: string | null;


    constructor( item?: OptionalModel<Model> ) {
        super();
        Prop.initialize( this, item );
    }


    static initialize<TModel extends Model, TItem extends OptionalModel<TModel>>(
        data: TItem[]
    ) {
        return Prop.arrayInitialize( Model, data );
    }


    // Actualizar datos
    set( item: OptionalModel<this> ): this {
        Prop.set( this, item );
        return this;
    }


    assign( item: OptionalModel<this> ): this {
        Prop.assign( this, item );
        return this;
    }


    // Relacionar datos
    setRelation( context = new ExecutionContext() ): this {
        return this;
    }


    // Verificar identidad de datos
    isSameIdentity( item: this ): boolean {
        return item.symbol === this.symbol
            ? true
            : ( item.uuid && this.uuid ) &&
                ( item.uuid === this.uuid )
                ? true
                : false;
    }


    toJSON(): Record<string, any> {
        return Cast.modelToJson( this )
    }


    // Instancias
    getInstancesOf<T extends typeof Model>( targetClass: T ) {
        return UtilImmutable.getInstancesOf( this, targetClass );
    }

    setInstanceBySymbol<T extends typeof Model>( targetClass: T, record: Record<symbol, InstanceType<T>> ) {
        UtilImmutable.setInstanceBySymbol( this, targetClass, record );
        return this;
    }

    setInstanceByUuid<T extends typeof Model>( targetClass: T, record: Record<string, InstanceType<T>> ) {
        UtilImmutable.setInstanceByUuid( this, targetClass, record );
        return this;
    }
}