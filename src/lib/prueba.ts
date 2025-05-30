import Decimal from 'decimal.js';
import { ClienteNatural, Prop } from '../index';

const clienteNatural = new ClienteNatural({
    uuid: 'daf'
});

console.log( clienteNatural );

clienteNatural.set({
    id: 3,
    uuid: 'asdf'
});

console.log( clienteNatural );


// const fechas = [
//     '2025-05-13T20:01:57.000Z',
//     '2025-05-13 20:01:57Z',
//     '2025-05-13 20:01:57 Z',
//     '2025-05-13T20:01:57.000',
//     '2025-05-13 20:01',
// ]

const fechas = [
    '2025-05-13T20:01:00',
    '2025-05-13 20:01',
    '2025-05-13 20'
]

fechas.forEach( fecha => {
    console.log( 'fecha:', fecha )
    console.log( 'setDateTime:', Prop.setDateTime( fecha ) )
    console.log( 'toiso:', Prop.toDateTime( fecha ).toISO({includeOffset:false}) )
});

const dec = new Decimal( 0 );

console.log( dec === dec.plus( 1 ) );