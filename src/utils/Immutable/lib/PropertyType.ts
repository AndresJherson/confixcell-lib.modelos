import { ClassType, PropBehavior, PropertyInfo, PropMetadataProperty, TypeInfo } from '../index';
import { PropTypes } from './prop-types';

export class PropertyType {
    
    static defineProperty<T extends PropBehavior>( parameters: {
        target: any,
        propertyKey: string | symbol,
        metadata: PropMetadataProperty<T>
    } ) {
        const { target, propertyKey, metadata } = parameters;

        const {
            constructorName,
            resolvedMetadata
        } = PropertyType.resolvePropertyMetadata( { target, propertyKey, metadata } )

        PropertyType.definePropertyInfo( {
            target,
            constructorName,
            propertyKey: propertyKey.toString(),
            metadata: resolvedMetadata
        } )
    }
    

    private static resolvePropertyMetadata( parameters: {
        target: any,
        propertyKey: string | symbol,
        metadata: PropMetadataProperty<any>
    } ) {

        const { target, propertyKey, metadata } = parameters;
        const { behavior } = metadata;

        const constructorName: string = target.prototype?.constructor.type ?? target.constructor.type ?? '';
        const propertyType: string | undefined = PropTypes[constructorName][propertyKey.toString()]
        let resolvedBehavior: string | undefined;

        try {
            resolvedBehavior = behavior
                ? behavior.toString()
                : propertyType.toLowerCase();
        }
        catch ( error ) {
            resolvedBehavior = undefined;
        }

        return {
            constructorName,
            resolvedMetadata: {
                ...metadata,
                behavior: resolvedBehavior
            }
        }
    }


    private static definePropertyInfo( parameters: {
        target: any,
        propertyKey: string,
        constructorName: string,
        metadata: PropMetadataProperty<any>
    } ) {
        const { target, propertyKey, constructorName, metadata } = parameters;

        const propertyInfo: PropertyInfo = {
            name: propertyKey,
            metadata: metadata
        };

        const typeInfo: TypeInfo = ClassType.getTypeInfo( target ) ?? {
            name: constructorName,
            value: target,
            recordPropertyInfo: {}
        };

        typeInfo.recordPropertyInfo[propertyKey.toString()] = propertyInfo;

        ClassType.recordMetadata.set( constructorName, typeInfo );
    }

}