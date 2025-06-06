import Decimal from 'decimal.js';
import { ClienteNatural, DocumentoSalidaBienConsumo, EntradaBienConsumoValorNuevo, EntradaBienConsumoValorSalida, Genero, Prop, SalidaBienConsumoValorEntrada } from '../index';


const a = '';
const b = '  ';

if (a.length) console.log('a');
if (b.length) console.log('b');

// console.log('a previo:', a);
// console.log('a despues:', a);


// // const fechas = [
// //     '2025-05-13T20:01:57.000Z',
// //     '2025-05-13 20:01:57Z',
// //     '2025-05-13 20:01:57 Z',
// //     '2025-05-13T20:01:57.000',
// //     '2025-05-13 20:01',
// // ]

// const fechas = [
//     '2025-05-13T20:01:00',
//     '2025-05-13 20:01',
//     '2025-05-13 20'
// ]

// fechas.forEach( fecha => {
//     console.log( 'fecha:', fecha )
//     console.log( 'setDateTime:', Prop.setDateTime( fecha ) )
//     console.log( 'toiso:', Prop.toDateTime( fecha ).toISO({includeOffset:false}) )
// });

// const dec = new Decimal( 0 );

// console.log( dec === dec.plus( 1 ) );