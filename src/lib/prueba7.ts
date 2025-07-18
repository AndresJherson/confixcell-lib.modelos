import Decimal from 'decimal.js';
import { DocumentoFuente, EntradaEfectivoCredito, NotaEgreso, NotaEgresoCredito } from '../index';

const prueba1 = () => {

    const entradaEfectivo = new NotaEgresoCredito( {
        importeValorNeto: 100,
        importeInteres: 25,
        documentoFuente: new NotaEgreso( {
            importeNeto: 500,
            concepto: 'venta'
        } ),
    } );
    entradaEfectivo.setRelation();
    console.log( 'acceso a referencia anidada', entradaEfectivo.documentoFuente?.credito?.documentoFuente?.credito )

    console.log( {
        documentoFuente: entradaEfectivo.documentoFuente,
    } )
    console.log( entradaEfectivo.toJSON() )

}

const prueba2 = () => {

    // creditos
    console.log( "\nCREDITOS - prueba2" );

    const credito = new NotaEgresoCredito( {
        tasaInteresDiario: 0.5
    } );

    console.log( 'credito JSON', credito.toJSON() )
}

prueba2();