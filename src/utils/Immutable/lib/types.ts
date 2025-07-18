import { Model } from '../../../index';

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

export type ValueCallback<T> = ( prev: any, curr: any ) => T;

export type PropGetValue<T extends PropBehavior> =
    T extends
    PropBehavior.string |
    PropBehavior.time |
    PropBehavior.date |
    PropBehavior.datetime ? ValueCallback<String> :
    T extends PropBehavior.number ? ValueCallback<Number> :
    T extends PropBehavior.boolean ? ValueCallback<Boolean> :
    T extends PropBehavior.object ? ValueCallback<Object> :
    T extends PropBehavior.model ? ValueCallback<Model> :
    T extends PropBehavior.array ? ValueCallback<any> :
    never;


export interface TypeInfo {
    name: string,
    value: new ( ...args: any[] ) => Model,
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