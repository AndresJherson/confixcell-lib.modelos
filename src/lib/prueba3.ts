import { Cast, EntradaEfectivoCredito, Model, NotaEgreso, NotaEgresoCredito, SubUsuario, SuperUsuario } from '../index';


const subUsuario1 = new SubUsuario();
const subUsuario2 = new SubUsuario();
const subUsuario3 = new SubUsuario();

const superUsuario = new SuperUsuario();

superUsuario.subUsuarios = [];
superUsuario.subUsuarios?.push( subUsuario1, subUsuario2, subUsuario3 )

superUsuario.setRelation();

console.log( superUsuario )

console.log( superUsuario.subUsuarios[2].superUsuario?.subUsuarios![2].superUsuario?.subUsuarios![2].superUsuario?.subUsuarios![1] )

console.log( JSON.stringify( superUsuario, null, 4 ) )


// creditos
console.log( "\nCREDITOS" );

const egreso = new NotaEgreso({
    importeBruto: 340.2
});

const credito = new NotaEgresoCredito({
    tasaInteresDiario: 0.5
});

egreso.assign( {
    credito
} )

egreso.setRelation();

console.log( egreso );

console.log( egreso.credito?.documentoFuente?.credito?.documentoFuente?.credito )

console.log( 'credito JSON', credito.toJSON() )
console.log( JSON.stringify( egreso, null, 4 ) )




// eliminar la referencia ciclica es instanciar nuevamente

console.log( "\n re-instanciación de NotaEgreso" )
const egresoDto = new NotaEgreso( egreso );
console.log( egresoDto );
console.log( JSON.stringify( egresoDto ) )

console.log( "\n .setRelation de nueva instancia" )
egresoDto.setRelation();
console.log( egresoDto );

console.log( "\n .set de NotaEgreso original" )
const egreso2sed = new NotaEgreso( egreso );
egreso.set( egreso2sed )
console.log( egreso );


console.log( "\n .setRelation de NotaEgreso original" )
egreso.setRelation();
console.log( egreso );


console.log( "\n JSON.stringify de ambas instancias" )
console.log( JSON.stringify( egreso ) )
console.log( JSON.stringify( egresoDto ) )


console.log( "\n nullable" )
const nul = new NotaEgreso().assign({
    usuario: null
})
console.log( nul.toJSON()  )