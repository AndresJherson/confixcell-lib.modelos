import { ExecutionContext } from '../../utils/ExecutionContext';
import { OptionalModel } from '../../utils/types';
import { IImmutable } from '../index';

export interface IModel extends IImmutable {
    __Model: 'Model';
    symbol: symbol;
    uuid?: string | null;

    constructor( item?: OptionalModel<IModel> ): IModel;
    initialize<
        TItem extends OptionalModel<IModel>
    >( data: TItem[] )
        : unknown extends TItem
        ? ( IModel | null )[]
        : null extends TItem
        ? ( IModel | ( TItem & null ) )[]
        : undefined extends TItem
        ? ( IModel | null )[]
        : IModel[]

    set( item: OptionalModel<this> ): this;
    assign( item: OptionalModel<this> ): this;
    setRelation( context?: ExecutionContext ): this;
    isSameIdentity( item: this ): boolean;

    getInstancesOf<T extends new ( ...args: any ) => IModel>( targetClass: T ): InstanceType<T>[];
    setInstancesBySymbol<T extends new ( ...args: any ) => IModel>( targetClass: T, record: Record<string, InstanceType<T>> ): this;
    setInstanceByUuid<T extends new ( ...args: any ) => IModel>( targetClass: T, record: Record<string, InstanceType<T>> ): this;
}