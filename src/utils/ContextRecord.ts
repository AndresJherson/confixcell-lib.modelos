export class ContextRecord {

    private record = new WeakMap<object, Set<SavePointType>>();


    has( context: object ): boolean {
        return this.record.has( context );
    }


    hasSavePoint( context: object, savepoint: SavePointType ): boolean {
        return this.record.get( context )?.has( savepoint ) ?? false;
    }

    
    mark( context: object, savepoint: SavePointType ): boolean {

        if ( !this.record.has( context ) ) {
            this.record.set( context, new Set() );
        }

        const set = this.record.get( context )!;
        if ( set.has( savepoint ) ) return false;

        set.add( savepoint );
        return true;
    }


    getSavePoints( context: object ) {
        return [...( this.record.get( context ) ?? [] )];
    }
}

type SavePointType = string | number | symbol | object | Function;