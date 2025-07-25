import Decimal from 'decimal.js';
import { DocumentoEntradaBienConsumo, DocumentoFuente, EntradaEfectivoCredito, nameOf, Nota, NotaEgreso, NotaEgresoCredito, NotaVenta, Persona, SubUsuario, SuperUsuario, Usuario } from '../index';
import { PresetRecord } from './Record/PresetRecord';
import { UtilImmutable } from '../utils/Immutable';

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

const prueba3 = () => {
    const propiedad = nameOf<NotaEgresoCredito>( item => item.actualizarCuota )
    console.log( propiedad );
}

const prueba4 = () => {
    const record = new PresetRecord();
    console.log( record.toJSON() )
    record.set( {
        servicioDeReparacionDeNotaVenta: {
            ...record.servicioDeReparacionDeNotaVenta,
            value: '123'
        }
    } )
    console.log( record );
    // console.log( record.toJSON() )
};

const getModel = () => new NotaVenta( {
    cliente: new Persona( {
        uuid: '1'
    } ),
    notas: [
        new Nota( {
            usuario: new SubUsuario( {
                uuid: 'sub-1',
                persona: new Persona( {
                    uuid: '2'
                } )
            } )
        } ),
        new Nota( {
            usuario: new SubUsuario( {
                uuid: 'sub-2',
                persona: new Persona( {
                    uuid: '3'
                } )
            } )
        } )
    ],
    docsEntradaBienConsumo: [
        new DocumentoEntradaBienConsumo( {
            usuario: new SubUsuario( {
                uuid: 'sub-3',
                persona: new Persona( {
                    uuid: '4'
                } )
            } )
        } ),
        new DocumentoEntradaBienConsumo( {
            usuario: new SuperUsuario( {
                uuid: 'sup-1',
                persona: new Persona( {
                    uuid: '5'
                } )
            } )
        } )
    ]
} );

// instaceof dentro de modelo
const prueba5 = () => {

    const modelo = getModel();

    const personas = UtilImmutable.getInstancesOf( modelo, Persona );
    console.log( 'cantidad de Personas:', personas.length );
    console.log( personas.map( x => x.toJSON() ) )

    const subUsuarios = UtilImmutable.getInstancesOf( modelo, SubUsuario );
    console.log( 'cantidad de SubUsarios:', subUsuarios.length );
    console.log( subUsuarios.map( x => x.toJSON() ) )

    const superUsuarios = UtilImmutable.getInstancesOf( modelo, SuperUsuario );
    console.log( 'cantidad de SuperUsarios:', superUsuarios.length );
    console.log( superUsuarios.map( x => x.toJSON() ) )
}



// Set instances by key

const record: Record<string, Persona> = {
    '1': new Persona( {
        uuid: '1',
        codigo: 'a1',
        nombreCompleto: 'a'
    } ),
    '2': new Persona( {
        uuid: '2',
        codigo: 'a2',
        nombreCompleto: 'b'
    } ),
    '3': new Persona( {
        uuid: '3',
        codigo: 'a3',
        nombreCompleto: 'c'
    } ),
    '4': new Persona( {
        uuid: '4',
        codigo: 'a4',
        nombreCompleto: 'd'
    } )
}

const prueba6 = () => {

    const modelo = getModel();


    UtilImmutable.setInstanceByUuid( modelo, Persona, record );

    const personas = UtilImmutable.getInstancesOf( modelo, Persona );

    console.log( personas.map( item => item.toJSON() ) );
}

const prueba7 = () => {

    const modelo = getModel();

    modelo.setRelation();

    console.log( modelo );

    modelo.setInstanceByUuid( Persona, record );

    const personas = modelo.getInstancesOf( Persona );

    console.log( personas.map( x => x.toJSON() ) );
}


/**
 * Prueba de nameOf
 */
const test8 = () => {

    const name1 = nameOf<SubUsuario>( x => x.creadoPor )
    console.log( name1 );

    const name2 = nameOf<SubUsuario>( x => x.creadoPor?.contrasena )
    console.log( name2 );

    const name3= nameOf<SubUsuario>( x => x.superUsuario?.empresa?.superUsuario )
    console.log( name3 );
}
test8();