export class ExecutionContext {

    private executed: Map<object, Set<string>> = new Map();

    execute( instance: object, classId: string, fn: () => void ): void {

        if ( !this.executed.has( instance ) ) {
            this.executed.set( instance, new Set() );
        }

        const set = this.executed.get( instance )!;
        if ( set.has( classId ) ) return;

        set.add( classId );
        fn();
    }
}