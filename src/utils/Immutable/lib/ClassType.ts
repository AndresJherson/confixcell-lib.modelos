import { Model } from '../../../index';
import { TypeInfo } from '../index';

export class ClassType {

    public static recordMetadata = new Map<string, TypeInfo>();


    static defineClass( target: any ): void {
        if ( target.type ) {

            const className = target.type;

            const typeInfo: TypeInfo = ClassType.getTypeInfo( target ) ?? {
                name: className,
                value: target,
                recordPropertyInfo: {}
            };

            ClassType.recordMetadata.set( className, typeInfo );
        }
    }


    static getClass<T extends Model>( instance?: Object | null ) {
        try {
            if ( instance === undefined || instance === null ) return undefined;

            const className = typeof instance === 'object'
                ? ( Object.getPrototypeOf( instance ).constructor.type ?? ( instance as any ).type )
                : undefined;

            const typeInfo = ClassType.recordMetadata.get( className.toString() );

            return typeInfo ? typeInfo.value as new ( ...args: any[] ) => T : undefined;
        }
        catch ( error ) {
            return undefined;
        }
    }


    static getTypeInfo( target: any ): TypeInfo | undefined {
        try {
            const constructorName = target.prototype?.constructor.type ?? target.constructor.type;
            return ClassType.recordMetadata.get( constructorName );
        }
        catch ( error ) {
            return undefined;
        }
    }
}