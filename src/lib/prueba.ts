import Decimal from 'decimal.js';
import { Almacen, BienConsumo, ClienteNatural, DocumentoEntradaBienConsumo, DocumentoSalidaBienConsumo, EntradaBienConsumoValorNuevo, EntradaBienConsumoValorSalida, Genero, Prop, SalidaBienConsumoValorEntrada } from '../index';


// const a = '2025-06-08 14:41:26.284 -05:00';
// const b = '';

// const mov = new DocumentoEntradaBienConsumo({
//     fechaEmision: a
// });
// const guardado = mov.dateTimeEmision.toUTC().toISO({includeOffset:false})
// console.log(guardado)

// const mov2 = new DocumentoEntradaBienConsumo({
//     fechaEmision: `${guardado}Z`
// })
// console.log(mov2.fechaEmision)




const doc = new DocumentoEntradaBienConsumo({entradas:[]});
doc.entradas?.push(new EntradaBienConsumoValorNuevo({
    importeCostoNeto: 88.0,
    almacen: new Almacen({
        uuid: 'f9fbdc4d-13cf-4601-a1bf-8a0a29abd4c5'
    }),
    bienConsumo: new BienConsumo({
        uuid: 'f6a7b8c9-d0e1-2345-6789-0abcdef12345'
    })
}))

doc.entradas?.push(new EntradaBienConsumoValorNuevo({
    importeCostoNeto: 154.0
}))

const kardex = doc.toRecordKardexBienConsumo();
console.log(doc)
console.log(kardex['f9fbdc4d-13cf-4601-a1bf-8a0a29abd4c5|f6a7b8c9-d0e1-2345-6789-0abcdef12345'].movimientos)




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