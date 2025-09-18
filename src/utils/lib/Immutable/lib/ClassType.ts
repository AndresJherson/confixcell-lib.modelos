import { UtilPropertyDescriptor } from '../../../index';
import { Immutable, TypeInfo } from '../index';

export class ClassType {

    public static recordMetadata = new Map<string, TypeInfo>();


    static defineClass( target: any ): void {
        if ( target.type ) {

            const ctr = UtilPropertyDescriptor.getConstructor( target );
            if ( !ctr ) throw new Error( `[PropertyType] No se pudo obtener el constructor para  ${target}` );
            const className = ctr.type as string;

            const typeInfo: TypeInfo = ClassType.getTypeInfo( target ) ?? {
                name: className,
                value: ctr,
                recordPropertyInfo: {}
            };

            ClassType.recordMetadata.set( className, typeInfo );
        }
    }


    static getClass<T extends Immutable>( instance?: Object | null ) {
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
            const ctr = UtilPropertyDescriptor.getConstructor( target );
            if ( !ctr ) throw Error();

            const className = ctr.type as string;
            return ClassType.recordMetadata.get( className );
        }
        catch ( error ) {
            return undefined;
        }
    }
}