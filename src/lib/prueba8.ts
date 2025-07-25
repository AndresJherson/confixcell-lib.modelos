import { MetadataPresetRecord, Model, nameOf, PresetRecord, Servicio } from '../index';
import { ClassType } from '../utils/Immutable';

/**
 * PresetRecord.toPartialSchema
 */
const test1 = () => {
    console.log( "\n TEST 1 \n" )

    const json = JSON.parse( `{ "almacenDeBienesDeConsumoDeNotaVenta": 4 }` )
    const partial = PresetRecord.toPartialSchema( json );
    if (
        partial &&
        'almacenDeBienesDeConsumoDeNotaVenta' in partial ) {
        console.log( partial.almacenDeBienesDeConsumoDeNotaVenta )
    }
    else {
        console.log( partial );
    }
}

/**
 * PresetRecord.fromSchema
 */
const test2 = () => {
    console.log( "\n TEST 2 \n" )

    const presetRecord = PresetRecord.fromSchema( {
        almacenDeBienesDeConsumoDeNotaVenta: "2",
        almacenDeRecursosBienDeConsumoDeNotaVenta: undefined,
        servicioDeReparacionDeNotaVenta: 'xx-xx-xx'
    } );
    const partialSchema = presetRecord.toSchema( 'almacenDeBienesDeConsumoDeNotaVenta' );
    const schema = presetRecord.toSchema();

    console.log( {
        presetRecord,
        partialSchema,
        schema
    } );
}


/**
 * 
 * Otros ejemplos
 */


// Ejemplos de uso con diferentes casos del Request Body:

const test3 = () => {
    console.log( "\n TEST 3 \n" )

    // Caso ideal: body con una propiedad válida
    const requestBody1 = { servicioDeReparacionDeNotaVenta: 'xxxx-xxxx-xxxx' };
    const result1 = PresetRecord.toPartialSchema( requestBody1 );
    // result1: { servicioDeReparacionDeNotaVenta: 'xxxx-xxxx-xxxx' }
    console.log( {
        result1
    } )

    // Caso ideal: otra propiedad válida
    const requestBody2 = { almacenDeBienesDeConsumoDeNotaVenta: 12345 };
    const result2 = PresetRecord.toPartialSchema( requestBody2 );
    // result2: { almacenDeBienesDeConsumoDeNotaVenta: 12345 }
    console.log( {
        result2
    } )

    // Caso con propiedad inválida
    const requestBody3 = { propiedadInexistente: "valor" };
    const result3 = PresetRecord.toPartialSchema( requestBody3 );
    // result3: null
    console.log( {
        result3
    } )

    // Caso con múltiples propiedades (toma la primera válida)
    const requestBody4 = {
        propiedadInvalida: "valor",
        servicioDeReparacionDeNotaVenta: 'xxxx-xxxx-xxxx',
        almacenDeBienesDeConsumoDeNotaVenta: 12345
    };
    const result4 = PresetRecord.toPartialSchema( requestBody4 );
    // result4: { servicioDeReparacionDeNotaVenta: 'xxxx-xxxx-xxxx' } (primera válida encontrada)
    console.log( {
        result4
    } )

    // Caso con body inválido
    const requestBody5 = null;
    const result5 = PresetRecord.toPartialSchema( requestBody5 );
    // result5: undefined
    console.log( {
        result5
    } )

    // Caso con string en lugar de objeto
    const requestBody6 = "not an object";
    const result6 = PresetRecord.toPartialSchema( requestBody6 );
    // result6: undefined
    console.log( {
        result6
    } )

}


/**
 * Prueba de MetadataPresetRecord como clase
 */
const test4 = () => {

    console.log( "\n TEST 4 \n" )

    const presetRecord = PresetRecord.fromSchema( {
        almacenDeBienesDeConsumoDeNotaVenta: "123",
        almacenDeRecursosBienDeConsumoDeNotaVenta: null,
        servicioDeReparacionDeNotaVenta: 'xx-xx-xx'
    } );

    // estructura del objeto preset record
    console.log( { presetRecord } );

    presetRecord.set( {
        almacenDeBienesDeConsumoDeNotaVenta: new MetadataPresetRecord( {
            value: '321',
            model: null
        } )
    } )

    console.log( { presetRecord } );

    presetRecord.set( {
        servicioDeReparacionDeNotaVenta: new MetadataPresetRecord( {
            value: 'servicio',
            model: new Servicio()
        } )
    } )

    console.log( { presetRecord } );

    const preset2 = new PresetRecord( {
        ...presetRecord,
        servicioDeReparacionDeNotaVenta: new MetadataPresetRecord( {
            value: 'servicees'
        } )
    } );

    console.log( { preset2 } );

    console.log( Model.initialize( [null, undefined, {}] ) )

}

const typeInfo = ClassType.getTypeInfo( MetadataPresetRecord );
console.log( typeInfo?.recordPropertyInfo );