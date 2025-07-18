import { DateTime } from 'luxon';
import { Credito, Cuota, DocumentoFuente, EntradaEfectivo, EntradaEfectivoCredito, EntradaEfectivoCuota, Model, NotaEgresoCredito, NotaEgresoCuota, SalidaEfectivo, SubUsuario } from '../index';


// const data = [
//     new EntradaEfectivoCuota(),
//     new EntradaEfectivo(),
//     new NotaEgresoCredito(),
//     new NotaEgresoCuota(),
//     new Cuota(),
//     new Model(),
// ]


// const a = new NotaEgresoCredito();
// console.log('1º fase', a)

// a.set({
//     importeValorNeto: 100,
//     cuotas: [
//         new NotaEgresoCuota({
//             importeAmortizacion: 551
//         }),
//         new Cuota({
//             importeCobrado: 45.3
//         })
//     ]
// })
// console.log('2º fase', a)

// const b = new NotaEgresoCredito(a);
// console.log('3º fase', b)
// console.log(a.cuotas![0] === b.cuotas![0])

// b.set({
//     importeValorNeto: 5,
//     cuotas: [
//         new NotaEgresoCuota({
//             fechaInicio: DateTime.now().toSQL()
//         })
//     ]
// })
// console.log('4º fase', b)


const credito = new Credito({
    importeValorNeto: 0,
    tasaInteresDiario: 2,
    importeInteres: 3,
    porcentajeInteres: 4,
    importeValorFinal: 5
})
console.log( credito.toJSON() );

const entradaEfectivo = new EntradaEfectivoCredito( {
    documentoFuente: new DocumentoFuente({
        importeNeto: 205.59
    }),
} );
console.log( '1º', entradaEfectivo.toJSON() )

entradaEfectivo.importeValorNeto = 93.51;
console.log( '2º', entradaEfectivo.toJSON(), entradaEfectivo.importeValorNeto )

const e2 = new EntradaEfectivoCredito( entradaEfectivo );
console.log( '3º', e2.toJSON() );
console.log( {
    'entradaEfectivo.documentoFuente === e2.documentoFuente': entradaEfectivo.documentoFuente === e2.documentoFuente
} )

e2.importeValorFinal = 32;
e2.importeValorNeto = 541.92
console.log( e2.toJSON(), e2.importeValorFinal )

console.log( "\n JSON" )
console.log( JSON.stringify( entradaEfectivo ) )
console.log( JSON.stringify( e2 ) )

console.log( "\n cuotas" )
const cuota1 = new EntradaEfectivoCuota( { fechaVencimiento: DateTime.local().plus( { days: 5 } ).toSQL() } );
console.log( "cuota creada", cuota1.toJSON() )
e2.agregarCuota( cuota1 );

console.log( '1º cuota agregada:', {
    modelo: e2.cuotas?.map( x => x.toJSON() ),
} )

cuota1.importeCuota = 32.1;

console.log( 'importeCuota cambiado:', {
    cuota: e2.cuotas![0].toJSON(),
} )








// /** Prueba de usuario */
// const usuario = new SubUsuario();
// usuario.set({
    
// });