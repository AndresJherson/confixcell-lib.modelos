import 'reflect-metadata';
import { ClassType, Immutable, PropBehavior, PropertyType, PropMetadataProperty } from '../../Immutable';
import { Model } from '../../../index';


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
        Immutable.initialize( target, item );
    }


    static set( target: NonNullable<Object>, item?: any ) {
        Immutable.set( target, item );
    }


    static assign( target: NonNullable<Object>, item?: any ) {
        Immutable.assign( target, item );
    }


    static getClass<T extends Model>( instance?: Object | null ) {
        return ClassType.getClass<T>( instance );
    }
}
