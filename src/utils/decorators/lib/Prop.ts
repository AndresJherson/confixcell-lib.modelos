import 'reflect-metadata';
import { ClassType, UtilImmutable, PropBehavior, PropertyType, PropMetadataProperty } from '../../Immutable';
import { Model, OptionalModel } from '../../../index';


export class Prop {

    static Class(): ClassDecorator {
        return ( target: any ) => {
            ClassType.defineClass( target );
        };
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


    static arrayInitialize<T extends Model>( targetClass: new ( ...args: any ) => T, data: OptionalModel<T>[] ): Array<T | null> {
        return data.map( item =>
            item != null
                ? new ( ClassType.getClass<T>( item ) ?? targetClass )( item )
                : null
        )
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
