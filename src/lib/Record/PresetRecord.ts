import { Almacen, Model, ModelType, nameOf, OptionalModel, Prop, PropBehavior, Servicio } from '../../index';
import { Immutable } from '../../utils/Immutable';

@Prop.Class()
export class MetadataPresetRecord<TValue extends Object = any, TModel extends Object = any> extends Immutable {

    static override type: string = 'MetadataPresetRecord';
    override type: string = MetadataPresetRecord.type;

    @Prop.Set() value?: TValue | null;
    @Prop.Set() descripcion: string = '';
    @Prop.Set() model?: TModel | null;

    constructor( item?: OptionalModel<MetadataPresetRecord<TValue, TModel>> ) {
        super();
        Prop.initialize( this, item );
    }
}

@Prop.Class()
export class PresetRecord extends Model {

    static override type: string = ModelType.PresetRecord;
    override type: string = ModelType.PresetRecord;

    static almacenDeBienesDeConsumoDeNotaVenta: MetadataPresetSchema<String, Almacen> = {
        valueCtor: String,
        descripcion: 'Almacén de productos para el documento Nota de Venta',
        modelCtor: Almacen,
        processMetadata: prevValue => new MetadataPresetRecord( {
            value: prevValue.value != null ? new String( prevValue.value ) : null,
            descripcion: PresetRecord.almacenDeBienesDeConsumoDeNotaVenta.descripcion,
            model: prevValue.model != null ? new Almacen( prevValue.model ) : null
        } )
    }

    static almacenDeRecursosBienDeConsumoDeNotaVenta: MetadataPresetSchema<String, Almacen> = {
        valueCtor: String,
        descripcion: 'Almacén de recursos del servicio de reparación para el documento Nota de Venta',
        modelCtor: Almacen,
        processMetadata: prevValue => new MetadataPresetRecord( {
            value: prevValue.value != null ? new String( prevValue.value ) : null,
            descripcion: PresetRecord.almacenDeRecursosBienDeConsumoDeNotaVenta.descripcion,
            model: prevValue.model != null ? new Almacen( prevValue.model ) : null
        } )
    }

    static servicioDeReparacionDeNotaVenta: MetadataPresetSchema<String, Servicio> = {
        valueCtor: String,
        descripcion: 'Servicio de Reparación de solo lectura',
        modelCtor: Servicio,
        processMetadata: prevValue => new MetadataPresetRecord( {
            value: prevValue.value != null ? new String( prevValue.value ) : null,
            descripcion: PresetRecord.servicioDeReparacionDeNotaVenta.descripcion,
            model: prevValue.model != null ? new Servicio( prevValue.model ) : null
        } )
    }


    static fromSchema( schema?: OptionalSchema<ReturnType<PresetRecord['toSchema']>> ) {

        const presetRecord = new PresetRecord();

        try {
            if ( !schema || typeof schema !== 'object' ) return presetRecord;

            const validMetadataKeys = [
                nameOf<PresetRecord>( x => x.almacenDeBienesDeConsumoDeNotaVenta ),
                nameOf<PresetRecord>( x => x.almacenDeRecursosBienDeConsumoDeNotaVenta ),
                nameOf<PresetRecord>( x => x.servicioDeReparacionDeNotaVenta ),
            ] as ( keyof PresetRecord )[];

            const schemaKeys = Object.keys( schema ) as ( keyof typeof schema )[];

            for ( const key of schemaKeys ) {
                if ( validMetadataKeys.includes( key ) ) {

                    const value = schema[key];
                    const prevMetadata = presetRecord[key]
                    presetRecord.set( {
                        [key]: new MetadataPresetRecord( {
                            ...prevMetadata,
                            value: value
                        } )
                    } );

                }
            }

        }
        catch ( error ) {
            return presetRecord;
        }

        return presetRecord;
    }


    static toPartialSchema( partialSchema: any ):
        | {
            [K in MetadataKeys<PresetRecord>]: { [P in K]: PresetRecord[P] extends MetadataPresetRecord<infer TValue, any> ? TValue | null | undefined : never }
        }[MetadataKeys<PresetRecord>]
        | null
        | undefined {

        // Validar que el input sea un objeto válido
        if ( !partialSchema || typeof partialSchema !== 'object' ) {
            return undefined;
        }

        // Lista de propiedades válidas de tipo MetadataPresetRecord
        const validMetadataKeys = [
            nameOf<PresetRecord>( x => x.almacenDeBienesDeConsumoDeNotaVenta ),
            nameOf<PresetRecord>( x => x.almacenDeRecursosBienDeConsumoDeNotaVenta ),
            nameOf<PresetRecord>( x => x.servicioDeReparacionDeNotaVenta ),
        ];

        const partialSchemaKeys = Object.keys( partialSchema );

        // Buscar la primera (y idealmente única) propiedad válida
        for ( const key of partialSchemaKeys ) {
            if ( validMetadataKeys.includes( key ) ) {
                // Crear y retornar el objeto con solo esa propiedad
                const result = {} as any;
                result[key] = partialSchema[key];
                return result;
            }
        }

        // Si no se encuentra ninguna propiedad válida
        return null;
    }


    @Prop.Set( { behavior: PropBehavior.model, getValue: x => PresetRecord.almacenDeBienesDeConsumoDeNotaVenta.processMetadata( new MetadataPresetRecord( x ) ) } )
    almacenDeBienesDeConsumoDeNotaVenta: MetadataPresetRecord<string, Almacen> = new MetadataPresetRecord<string, Almacen>( {
        value: null,
        descripcion: PresetRecord.almacenDeBienesDeConsumoDeNotaVenta.descripcion,
        model: null
    } );

    @Prop.Set( { behavior: PropBehavior.model, getValue: x => PresetRecord.almacenDeRecursosBienDeConsumoDeNotaVenta.processMetadata( new MetadataPresetRecord( x ) ) } )
    almacenDeRecursosBienDeConsumoDeNotaVenta: MetadataPresetRecord<string, Almacen> = new MetadataPresetRecord<string, Almacen>( {
        value: null,
        descripcion: PresetRecord.almacenDeRecursosBienDeConsumoDeNotaVenta.descripcion,
        model: null
    } );

    @Prop.Set( { behavior: PropBehavior.object, getValue: x => PresetRecord.servicioDeReparacionDeNotaVenta.processMetadata( new MetadataPresetRecord( x ) ) } )
    servicioDeReparacionDeNotaVenta: MetadataPresetRecord<string, Servicio> = new MetadataPresetRecord<string, Servicio>( {
        value: null,
        descripcion: PresetRecord.servicioDeReparacionDeNotaVenta.descripcion,
        model: null
    } );


    constructor( item?: OptionalModel<PresetRecord> ) {
        super();
        Prop.initialize( this, item );
    }


    override set( item: OptionalModel<PresetRecord> ): this {
        return super.set( item as OptionalModel<this> );
    }


    override assign( item: OptionalModel<PresetRecord> ): this {
        return super.assign( item as OptionalModel<this> );
    }



    toSchema<K extends MetadataKeys<this>>(
        property: K
    ): { [P in K]: this[P] extends MetadataPresetRecord<infer TValue, any> ? TValue | null | undefined : never };

    toSchema(): {
        [K in MetadataKeys<this>]: this[K] extends MetadataPresetRecord<infer TValue, any>
        ? TValue | null | undefined
        : never;
    };

    toSchema( property?: keyof this ): any {
        if ( property )
            return {
                [property]: ( this[property] as MetadataPresetRecord<any, any> ).value
            };

        return {
            almacenDeBienesDeConsumoDeNotaVenta: this.almacenDeBienesDeConsumoDeNotaVenta.value,
            almacenDeRecursosBienDeConsumoDeNotaVenta: this.almacenDeRecursosBienDeConsumoDeNotaVenta.value,
            servicioDeReparacionDeNotaVenta: this.servicioDeReparacionDeNotaVenta.value
        }
    }
}

export interface MetadataPresetSchema<TValue extends Object, TModel extends Model> {
    valueCtor: new ( ...args: any ) => TValue,
    descripcion: string,
    modelCtor: new ( ...args: any ) => TModel,
    processMetadata: ( previousValue: MetadataPresetRecord ) => MetadataPresetRecord<TValue, TModel>
}


type MetadataKeys<T> = Extract<{
    [K in keyof T]: T[K] extends MetadataPresetRecord<any, any> ? K : never
}[keyof T], string>;


type OptionalSchema<T> =
    | { [P in keyof T]?: T[P] | undefined | null; }
    | null
    | undefined
