import 'reflect-metadata';
import { ClassType, UtilImmutable, PropBehavior, PropertyType, PropMetadataProperty } from '../../Immutable';
import { Model, OptionalModel } from '../../../index';
import { UtilModels } from '../../UtilModels';


export class Prop {

    static Class( interfaces?: Function[] ): ClassDecorator {
        return ( target: Function ) => {
            ClassType.defineClass( target );
            UtilModels.implements( target, interfaces ?? [] );
        };
    }


    static Implements( interfaces: Function[] ): ClassDecorator {
        return ( target: Function ) => {
            UtilModels.implements( target, interfaces );
        }
    }


    static Set<T extends PropBehavior>( metadata?: PropMetadataProperty<T> ): PropertyDecorator {
        return ( target: any, propertyKey ) => {

            PropertyType.defineProperty( {
                target,
                propertyKey,
                metadata: metadata ?? {}
            } )

        }
    }


    static initialize( target: NonNullable<Object>, item?: any ) {
        UtilImmutable.initialize( target, item );
    }


    static arrayInitialize<
        TCtor extends new ( ...args: any ) => Model,
        TItem extends OptionalModel<InstanceType<TCtor>>
    >(
        targetClass: TCtor,
        data: Array<TItem>
    )
        : unknown extends TItem
        ? Array<InstanceType<TCtor> | null>
        : null extends TItem
        ? Array<InstanceType<TCtor> | null>
        : undefined extends TItem
        ? Array<InstanceType<TCtor> | null>
        : Array<InstanceType<TCtor>> {

        return data.map( item =>
            item != null
                ? new ( ClassType.getClass<InstanceType<TCtor>>( item ) ?? targetClass )( item )
                : null
        ) as any;
    }


    static set( target: NonNullable<Object>, item?: any ) {
        UtilImmutable.set( target, item );
    }


    static assign( target: NonNullable<Object>, item?: any ) {
        UtilImmutable.assign( target, item );
    }


    static getClass<T extends Model>( instance?: Object | null ) {
        return ClassType.getClass<T>( instance );
    }
}