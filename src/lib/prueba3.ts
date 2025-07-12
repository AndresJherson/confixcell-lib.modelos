import { Cast, Model, NotaEgreso, NotaEgresoCredito, SubUsuario, SuperUsuario } from '../index';


const subUsuario1 = new SubUsuario();
const subUsuario2 = new SubUsuario();
const subUsuario3 = new SubUsuario();

const superUsuario = new SuperUsuario();

superUsuario.subUsuarios = [];
superUsuario.subUsuarios?.push( subUsuario1, subUsuario2, subUsuario3 )

superUsuario.setRelation();

console.log( superUsuario )

console.log( superUsuario.subUsuarios[2].superUsuario?.subUsuarios![2].superUsuario?.subUsuarios![2].superUsuario?.subUsuarios![1] )

console.log( JSON.stringify( superUsuario, Cast.jsonReplacer(), 2 ) )


// creditos
console.log( "\nCREDITOS" );

const egreso = new NotaEgreso();

const credito = new NotaEgresoCredito();

egreso.assign( {
    credito
} )

egreso.setRelation();

console.log( egreso );

console.log( egreso.credito?.documentoFuente?.credito?.documentoFuente?.credito )

console.log( JSON.stringify( egreso, Cast.jsonReplacer(), 2 ) )


// eliminar la referencia ciclica es instanciar nuevamente

console.log( "\n re-instanciación de NotaEgreso" )
const egresoDto = new NotaEgreso( egreso );
console.log( egresoDto );
console.log( JSON.stringify( egresoDto ) )


console.log( "\n .set de NotaEgreso original" )
const egreso2sed = new NotaEgreso( egreso );
egreso.set( egreso2sed )
console.log( egreso );


console.log( "\n .setRelation de NotaEgreso original" )
egreso.setRelation();
console.log( egreso );


console.log( "\n nullable" )
new NotaEgreso().assign({
    usuario: null
})