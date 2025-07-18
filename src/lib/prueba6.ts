import { EntradaEfectivoCredito } from '../index';

const model = new EntradaEfectivoCredito({
    tasaInteresDiario: 32
});
// console.log( model );
// console.log( 'tasaInteresDiario', model.tasaInteresDiario );
console.log( "\nPrueba sin jsonReplacer()");
console.log( JSON.stringify( model, null, 4 ) )