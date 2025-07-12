import { ExecutionContext } from '../index';


class BaseModel {

    setRelation( context: ExecutionContext = new ExecutionContext() ): void {
        const classId = ( this.constructor as any ).name;

        context.execute( this, 'BaseModel', () => {
            // lógica propia de esta clase (si la hay)
            // ejemplo: ejecutar relaciones o registrar otras llamadas

            // Llamar a subobjetos o propiedades relacionadas aquí:
            // this.child?.setRelation(context);

            // Llamada a la clase padre
            const proto = Object.getPrototypeOf( BaseModel.prototype );
            if ( Object.getPrototypeOf( this )?.setRelation && Object.getPrototypeOf( this )?.setRelation !== this.setRelation ) {
                Object.getPrototypeOf( this ).setRelation.call( this, context );
            }
        } );
    }
}


class A extends BaseModel {

    propiedad?: B;

    override setRelation( context: ExecutionContext = new ExecutionContext() ): void {
        super.setRelation( context );
        
        context.execute( this, 'A', () => {
            console.log( 'relaciones de A' );
            
            // Relaciones adicionales
            // this.algo?.setRelation(context);
            this.propiedad?.setRelation( context );
        } );
    }
}

class A2 extends A {

    override propiedad?: B2;

    override setRelation( context: ExecutionContext = new ExecutionContext() ): void {
        super.setRelation( context );
        
        context.execute( this, 'A2', () => {
            console.log( 'relaciones de A2' );
            
            this.propiedad?.setRelation( context );
        } );
    }
}


class B extends BaseModel {

    propiedad?: A;

    override setRelation( context: ExecutionContext = new ExecutionContext() ): void {
        super.setRelation( context );
        
        context.execute( this, 'B', () => {
            console.log( 'relaciones de B' );
            
            this.propiedad?.setRelation( context );
        } );
    }
}

class B2 extends B {

    override propiedad?: A2;
    propiedad2?: A2

    override setRelation( context: ExecutionContext = new ExecutionContext() ): void {
        super.setRelation( context );
        
        context.execute( this, 'B2', () => {
            console.log( 'relaciones de B2' );
            
            this.propiedad?.setRelation( context );
            
            this.propiedad2?.setRelation( context );
        } );
    }
}


const a2 = new A2();
const xa2 = new A2();
const b2 = new B2();
b2.propiedad = a2;
b2.propiedad2 = xa2;

b2.setRelation();  // Output:
                    // relaciones de B
                    // relaciones de A
