import { Immutable } from './Immutable';

export enum PropBehavior {
    string = 'string',
    number = 'number',
    boolean = 'boolean',
    time = 'time',
    date = 'date',
    datetime = 'datetime',
    object = 'object',
    model = 'model',
    array = 'array',
    enum = 'enum'
}

export type ValueCallback<T> = ( prev: any, curr: any ) => ( T | null | undefined );

export type PropGetValue<T extends PropBehavior> =
    T extends
    PropBehavior.string |
    PropBehavior.time |
    PropBehavior.date |
    PropBehavior.datetime ? ValueCallback<String> :
    T extends PropBehavior.number ? ValueCallback<Number> :
    T extends PropBehavior.boolean ? ValueCallback<Boolean> :
    T extends PropBehavior.object ? ValueCallback<Object> :
    T extends PropBehavior.model ? ValueCallback<Immutable> :
    T extends PropBehavior.array ? ValueCallback<any> :
    never;


export interface TypeInfo {
    name: string,
    value: new ( ...args: any[] ) => Immutable,
    recordPropertyInfo: Record<string, PropertyInfo>
}

export interface PropertyInfo {
    name: string,
    metadata: PropMetadataProperty<any>
}

export interface PropMetadataProperty<T extends PropBehavior> {
    behavior?: T,
    getValue?: PropGetValue<T>,
    extends?: boolean
}