import { UtilPropertyDescriptor } from '../../UtilPropertyDescriptors';
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
            ctor,
            className,
            resolvedMetadata
        } = PropertyType.resolvePropertyMetadata( { target, propertyKey, metadata } )

        PropertyType.definePropertyInfo( {
            ctor,
            className,
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

        const ctor = UtilPropertyDescriptor.getConstructor( target );
        if ( !ctor ) throw new Error( `[PropertyType] No se pudo obtener el constructor para  ${target}` );
        const className = ctor.type as string;

        const propertyType: string | undefined = PropTypes[className][propertyKey.toString()]
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
            ctor,
            className,
            resolvedMetadata: {
                ...metadata,
                behavior: resolvedBehavior
            }
        }
    }


    private static definePropertyInfo( parameters: {
        ctor: new() => any,
        className: string,
        propertyKey: string,
        metadata: PropMetadataProperty<any>
    } ) {
        const { ctor, className, propertyKey, metadata } = parameters;

        const propertyInfo: PropertyInfo = {
            name: propertyKey,
            metadata: metadata
        };

        const typeInfo: TypeInfo = ClassType.getTypeInfo( ctor ) ?? {
            name: className,
            value: ctor,
            recordPropertyInfo: {}
        };

        typeInfo.recordPropertyInfo[propertyKey.toString()] = propertyInfo;

        ClassType.recordMetadata.set( className, typeInfo );
    }

}