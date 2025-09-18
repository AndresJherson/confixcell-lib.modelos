export interface IUtility {
    resolveReferenceDeepModelClone(obj: T): T;
    getAllPropertyKeys(obj: T): PropertyKey[];
    getDescriptor(value: T, key: PropertyKey): PropertyDescriptor | undefined;
}

export interface ICast extends Utility {
    toDateTime(value: unknown): luxon.DateTime<true> | luxon.DateTime<false>;
    toDuration(value: string | null | undefined): luxon.Duration<true> | luxon.Duration<false>;
    toInterval(dateTimeInicio: luxon.DateTime<boolean>, dateTimeFinal: luxon.DateTime<boolean>): luxon.Interval<true> | luxon.Interval<false>;
    toDecimal(value: string | number | null | undefined): import("D:/CONFIXCELL/Sistema/Componentes/modelos/node_modules/decimal.js/decimal").Decimal;
    setDate(value: any): string | null | undefined;
    setDateTime(value: any): string | null | undefined;
    setTime(value: any): string | null | undefined;
    setNumber(value: any): any;
    setNumberStrict(value: unknown): number | undefined;
    setString(value: unknown): string | undefined;
    setObject(value: unknown): Record<any, any> | undefined;
    arrayToRecordByUuid(data: T[]): Record<string, T>;
    jsonReplacer(): (_key: string, value: any) => any;
    modelToJson(model: T): Record<string, any>;
}

export interface IProporcion {
    tipo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Proporcion").TipoProporcion;
    antecedente: number;
    consecuente: number;
    calcularAntecedente(dadoConsecuente: number): import("D:/CONFIXCELL/Sistema/Componentes/modelos/node_modules/decimal.js/decimal").Decimal;
    calcularConsecuente(dadoAntecedente: number): import("D:/CONFIXCELL/Sistema/Componentes/modelos/node_modules/decimal.js/decimal").Decimal;
    invertir(): void;
    esEquivalente(otra: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Proporcion").Proporcion): boolean;
    toString(): string;
}

export interface IExecutionContext {
    executed: Map<object, Set<string>>;
    execute(instance: object, classId: string, fn: () => void): void;
}

export interface IContextRecord {
    record: WeakMap<object, Set<SavePointType>>;
    has(context: object): boolean;
    hasSavePoint(context: object, savepoint: SavePointType): boolean;
    mark(context: object, savepoint: SavePointType): boolean;
    getSavePoints(context: object): SavePointType[];
}

export interface IUtilModels {
    implements(target: Function, interfaces: Function[]): void;
    getAllClasses(ctor: Function): Function[];
    getAllInterfaces(ctor: Function): Function[];
    isInstanceOf(obj: object, iface: new (...args: any[]) => any): boolean;
    indexInstances(root: object): TypedInstanceMap;
}

export interface IProp {
    Class(interfaces: Function[] | undefined): ClassDecorator;
    Implements(interfaces: Function[]): ClassDecorator;
    Set(metadata: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Immutable/lib/types").PropMetadataProperty<T> | undefined): PropertyDecorator;
    initialize(target: Object, item: any): void;
    arrayInitialize(targetClass: TCtor, data: TItem[]): unknown extends TItem ? (InstanceType<TCtor> | null)[] : null extends TItem ? (InstanceType<TCtor> | null)[] : undefined extends TItem ? (InstanceType<TCtor> | null)[] : InstanceType<TCtor>[];
    set(target: Object, item: any): void;
    assign(target: Object, item: any): void;
    getClass(instance: Object | null | undefined): (new (...args: any[]) => T) | undefined;
}

export interface IUtilPropertyDescriptor {
    getAllProperties: typeof getAllProperties;
    getReadableProperties: typeof getReadableProperties;
    getReadOnlyProperties: typeof getReadOnlyProperties;
    getWritableProperties: typeof getWritableProperties;
    getWriteOnlyProperties: typeof getWriteOnlyProperties;
    getReadWriteProperties: typeof getReadWriteProperties;
    getAllPropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    getReadablePropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    getReadOnlyPropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    getWritablePropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    getWriteOnlyPropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    getReadWritePropertyNames: <T extends object>(obj: T) => (string & keyof T)[];
    isReadonly: <T extends object>(obj: T, propertyName: string) => boolean;
    getConstructor: typeof getConstructor;
}

export interface IPropertyDescriptorInfo {
    name: string & keyof T;
    readable: boolean;
    writable: boolean;
    enumerable: boolean;
    configurable: boolean;
    source: string;
}

export interface IModel extends Immutable {
    type: string;
    type: string;
    __Model: "Model";
    symbol: symbol;
    uuid?: string | null | undefined;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Model").Model | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Model").Model | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Model").Model | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Model").Model[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<this>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<this>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    isSameIdentity(item: this): boolean;
    toJSON(): Record<string, any>;
    getInstancesOf(targetClass: T): InstanceType<T>[];
    setInstanceBySymbol(targetClass: T, record: Record<symbol, InstanceType<T>>): this;
    setInstanceByUuid(targetClass: T, record: Record<string, InstanceType<T>>): this;
}

export interface IMetadataPresetRecord extends Immutable {
    type: string;
    type: string;
    __MetadataPresetRecord: "MetadataPresetRecord";
    value?: TValue | null | undefined;
    descripcion: string;
    model?: TModel | null | undefined;
}

export interface IPresetRecord extends Model {
    type: string;
    type: string;
    __PresetRecord: "PresetRecord";
    almacenDeBienesDeConsumoDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetSchema<String, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>;
    almacenDeRecursosBienDeConsumoDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetSchema<String, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>;
    servicioDeReparacionDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetSchema<String, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio>;
    almacenDeBienesDeConsumoDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetRecord<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>;
    almacenDeRecursosBienDeConsumoDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetRecord<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>;
    servicioDeReparacionDeNotaVenta: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetRecord<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio>;
    fromSchema(schema: OptionalSchema<{ almacenDeBienesDeConsumoDeNotaVenta: string | null | undefined; almacenDeRecursosBienDeConsumoDeNotaVenta: string | null | undefined; servicioDeReparacionDeNotaVenta: string | null | undefined; }>): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").PresetRecord;
    toPartialSchema(partialSchema: any): { almacenDeBienesDeConsumoDeNotaVenta: string | null | undefined; } | { almacenDeRecursosBienDeConsumoDeNotaVenta: string | null | undefined; } | { servicioDeReparacionDeNotaVenta: string | null | undefined; } | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").PresetRecord>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").PresetRecord>): this;
    toSchema(property: keyof this | undefined): any;
}

export interface IMetadataPresetSchema {
    valueCtor: new (...args: any) => TValue;
    descripcion: string;
    modelCtor: new (...args: any) => TModel;
    processMetadata: (previousValue: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetRecord<any, any>) => import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Record/PresetRecord").MetadataPresetRecord<TValue, TModel>;
}

export interface IUsuario extends Model {
    type: string;
    type: string;
    __Usuario: "Usuario";
    correo?: string | null | undefined;
    contrasena?: string | null | undefined;
    nombre?: string | null | undefined;
    esActivo?: boolean | null | undefined;
    fechaCreacion?: string | null | undefined;
    fechaActualizacion?: string | null | undefined;
    crear(): this;
    actualizar(): this;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario[];
}

export interface ISuperUsuario extends Usuario {
    type: string;
    type: string;
    __SuperUsuario: "SuperUsuario";
    empresa?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuarioEmpresa").SuperUsuarioEmpresa | null | undefined;
    preset?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/Preset").Preset | null | undefined;
    subUsuarios?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/SubUsuario").SubUsuario[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuario").SuperUsuario>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuario").SuperUsuario>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface ISuperUsuarioEmpresa extends Model {
    type: string;
    type: string;
    __SuperUsuarioEmpresa: "SuperUsuarioEmpresa";
    razonSocial?: string | null | undefined;
    ruc?: string | null | undefined;
    celular?: number | null | undefined;
    domicilio?: string | null | undefined;
    superUsuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuario").SuperUsuario | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuarioEmpresa").SuperUsuarioEmpresa>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuarioEmpresa").SuperUsuarioEmpresa>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IPreset extends Model {
    type: string;
    type: string;
    __Preset: "Preset";
    json?: Record<string, any> | null | undefined;
    superUsuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuario").SuperUsuario | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/Preset").Preset>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/Preset").Preset>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext | undefined): this;
}

export interface ISubUsuario extends Usuario {
    type: string;
    type: string;
    __SubUsuario: "SubUsuario";
    persona?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null | undefined;
    creadoPor?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null | undefined;
    superUsuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SuperUsuario/SuperUsuario").SuperUsuario | null | undefined;
    roles?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/SubUsuario").SubUsuario>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/SubUsuario").SubUsuario>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarRol(rol: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol): this;
    actualizarRol(rol: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol): this;
    eliminarRol(rol: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol): this;
    getRol(rol: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol | undefined;
}

export interface IRol extends Model {
    type: string;
    type: string;
    __Rol: "Rol";
    nombre?: string | null | undefined;
    descripcion?: string | null | undefined;
    permisos?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso[] | null | undefined;
    subUsuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/SubUsuario").SubUsuario | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarPermiso(permiso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso): this;
    actualizarPermiso(permiso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso): this;
    eliminarPermiso(permiso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso): this;
    getPermiso(permiso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso | undefined;
}

export interface IPermiso extends Model {
    type: string;
    type: string;
    __Permiso: "Permiso";
    nombre?: string | null | undefined;
    descripcion?: string | null | undefined;
    rol?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Rol").Rol | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/Permiso").Permiso>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IRecurso extends Model {
    type: string;
    type: string;
    __Recurso: "Recurso";
    codigo?: string | null | undefined;
    esEscribible?: boolean | null | undefined;
    fechaCreacion?: string | null | undefined;
    fechaActualizacion?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso[];
    crear(): this;
    actualizar(): this;
}

export interface IBien extends Recurso {
    type: string;
    type: string;
    __Bien: "Bien";
    precioUnitario?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/Bien").Bien[];
}

export interface IBienConsumo extends Bien {
    type: string;
    type: string;
    __BienConsumo: "BienConsumo";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo[];
}

export interface ICalidad extends Model {
    type: string;
    type: string;
    __Calidad: "Calidad";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/Calidad").Calidad>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/Calidad").Calidad>): this;
}

export interface IPantallaMarca extends Model {
    type: string;
    type: string;
    __PantallaMarca: "PantallaMarca";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaMarca").PantallaMarca>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaMarca").PantallaMarca>): this;
}

export interface IPantallaModelo extends Model {
    type: string;
    type: string;
    __PantallaModelo: "PantallaModelo";
    nombre?: string | null | undefined;
    marca?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaMarca").PantallaMarca | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModelo").PantallaModelo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModelo").PantallaModelo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IPantallaModeloCalidad extends BienConsumo {
    type: string;
    type: string;
    __PantallaModeloCalidad: "PantallaModeloCalidad";
    modelo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModelo").PantallaModelo | null | undefined;
    calidad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/Calidad").Calidad | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModeloCalidad").PantallaModeloCalidad>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModeloCalidad").PantallaModeloCalidad>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IProductoCategoria extends Model {
    type: string;
    type: string;
    __ProductoCategoria: "ProductoCategoria";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoCategoria").ProductoCategoria>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoCategoria").ProductoCategoria>): this;
}

export interface IProductoMarca extends Model {
    type: string;
    type: string;
    __ProductoMarca: "ProductoMarca";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoMarca").ProductoMarca>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoMarca").ProductoMarca>): this;
}

export interface IMagnitud extends Model {
    type: string;
    type: string;
    __Magnitud: "Magnitud";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/Magnitud").Magnitud>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/Magnitud").Magnitud>): this;
}

export interface IProducto extends BienConsumo {
    type: string;
    type: string;
    __Producto: "Producto";
    nombre?: string | null | undefined;
    marca?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoMarca").ProductoMarca | null | undefined;
    magnitud?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/Magnitud").Magnitud | null | undefined;
    categoria?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/ProductoCategoria").ProductoCategoria | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/Producto").Producto>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Producto/Producto").Producto>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IBienCapital extends Bien {
    type: string;
    type: string;
    __BienCapital: "BienCapital";
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    numero?: number | null | undefined;
    descripcion?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/BienCapital").BienCapital>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/BienCapital").BienCapital>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IAlmacen extends Model {
    type: string;
    type: string;
    __Almacen: "Almacen";
    nombre?: string | null | undefined;
    bienCapital?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/BienCapital").BienCapital | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IServicio extends Recurso {
    type: string;
    type: string;
    __Servicio: "Servicio";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio>): this;
    initialize(data: TArray[]): unknown extends TArray ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null)[] : null extends TArray ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | (TArray & null))[] : undefined extends TArray ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio[];
}

export interface IServicioEstandar extends Recurso {
    type: string;
    type: string;
    __ServicioEstandar: "ServicioEstandar";
    nombre?: string | null | undefined;
    categoria?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioEstandar/ServicioEstandarCategoria").ServicioEstandarCategoria | null | undefined;
    precioUnitario?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioEstandar/ServicioEstandar").ServicioEstandar>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioEstandar/ServicioEstandar").ServicioEstandar>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IServicioEstandarCategoria extends Model {
    type: string;
    type: string;
    __ServicioEstandarCategoria: "ServicioEstandarCategoria";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioEstandar/ServicioEstandarCategoria").ServicioEstandarCategoria>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioEstandar/ServicioEstandarCategoria").ServicioEstandarCategoria>): this;
}

export interface IServicioReparacion extends Recurso {
    type: string;
    type: string;
    __ServicioReparacion: "ServicioReparacion";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioReparacion/ServicioReparacion").ServicioReparacion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioReparacion/ServicioReparacion").ServicioReparacion>): this;
}

export interface IPersona extends Model {
    type: string;
    type: string;
    __Persona: "Persona";
    subUsuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/SubUsuario/SubUsuario").SubUsuario | null | undefined;
    documentoIdentificacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/DocumentoIdentificacion").DocumentoIdentificacion | null | undefined;
    codigo?: string | null | undefined;
    fechaCreacion?: string | null | undefined;
    fechaActualizacion?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona[];
    crear(): this;
    actualizar(): this;
}

export interface IGenero extends Model {
    type: string;
    type: string;
    __Genero: "Genero";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Genero").Genero>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Genero").Genero>): this;
}

export interface IDocumentoIdentificacion extends Model {
    type: string;
    type: string;
    __DocumentoIdentificacion: "DocumentoIdentificacion";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/DocumentoIdentificacion").DocumentoIdentificacion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/DocumentoIdentificacion").DocumentoIdentificacion>): this;
}

export interface IPersonaNatural extends Persona {
    type: string;
    type: string;
    __PersonaNatural: "PersonaNatural";
    nombre?: string | null | undefined;
    apellido?: string | null | undefined;
    genero?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Genero").Genero | null | undefined;
    domicilio?: string | null | undefined;
    celular?: number | null | undefined;
    celularRespaldo?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/PersonaNatural/PersonaNatural").PersonaNatural>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/PersonaNatural/PersonaNatural").PersonaNatural>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IPersonaJuridica extends Persona {
    type: string;
    type: string;
    __PersonaJuridica: "PersonaJuridica";
    nombre?: string | null | undefined;
    domicilio?: string | null | undefined;
    celular?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/PersonaJuridica/PersonaJuridica").PersonaJuridica>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/PersonaJuridica/PersonaJuridica").PersonaJuridica>): this;
}

export interface IPoliticaComercial extends Model {
    type: string;
    type: string;
    __PoliticaComercial: "PoliticaComercial";
    numero?: number | null | undefined;
    descripcion?: string | null | undefined;
    esActivo?: boolean | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/PoliticaComercial").PoliticaComercial>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/PoliticaComercial").PoliticaComercial>): this;
}

export interface IMovimientoRecurso extends Model {
    type: string;
    type: string;
    __MovimientoRecurso: "MovimientoRecurso";
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente | null | undefined;
    numero?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MovimientoRecurso").MovimientoRecurso[];
    procesarInformacion(): this;
}

export interface IMedioTransferencia extends Model {
    type: string;
    type: string;
    __MedioTransferencia: "MedioTransferencia";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MedioTransferencia").MedioTransferencia>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MedioTransferencia").MedioTransferencia>): this;
}

export interface IICredito extends Model {
    importeValorNeto?: number | null | undefined;
    tasaInteresDiario?: number | null | undefined;
    importeInteres?: number | null | undefined;
    porcentajeInteres?: number | null | undefined;
    importeValorFinal?: number | null | undefined;
    cuotas?: TCuota[] | null | undefined;
    agregarCuota(cuota: TCuota): this;
    actualizarCuota(cuota: TCuota): this;
    eliminarCuota(cuota: TCuota): this;
    getCuota(cuota: TCuota): TCuota | undefined;
    procesarCredito(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface ICredito extends Model, ICredito<TCuota> {
    type: string;
    type: string;
    __Credito: "Credito";
    context?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").ICredito<TCuota> | undefined;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: TCuota[] | null | undefined;
    #decimalDuracionMinutos: import("D:/CONFIXCELL/Sistema/Componentes/modelos/node_modules/decimal.js/decimal").Decimal;
    #interesXminuto: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Proporcion").Proporcion;
    #amortizacionXminuto: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Proporcion").Proporcion;
    #cuotaXminuto: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/Proporcion").Proporcion;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota>>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota>>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota> | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota> | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota> | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<TCuota>[];
    agregarCuota(cuota: TCuota): this;
    actualizarCuota(cuota: TCuota): this;
    eliminarCuota(cuota: TCuota): this;
    getCuota(cuota: TCuota): TCuota | undefined;
    procesarCredito(): this;
    procesarCuotas(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface ICuota extends Model {
    type: string;
    type: string;
    __Cuota: "Cuota";
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").ICredito<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota> | null | undefined;
    numero?: number | null | undefined;
    fechaInicio?: string | null | undefined;
    fechaVencimiento?: string | null | undefined;
    duracionMinutos?: number | null | undefined;
    importeInteres?: number | null | undefined;
    importeAmortizacion?: number | null | undefined;
    importeCuota?: number | null | undefined;
    importeSaldo?: number | null | undefined;
    esActivoMora: boolean;
    fechaLimiteMora?: string | null | undefined;
    importeMora?: number | null | undefined;
    importeCobrado?: number | null | undefined;
    importePorCobrar?: number | null | undefined;
    porcentajeCobrado?: number | null | undefined;
    porcentajePorCobrar?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Cuota").Cuota[];
    calcularDuracion(): this;
}

export interface IEntradaRecurso extends MovimientoRecurso {
    type: string;
    type: string;
    __EntradaRecurso: "EntradaRecurso";
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaRecurso").EntradaRecurso[];
}

export interface IEntradaEfectivo extends EntradaRecurso {
    type: string;
    type: string;
    __EntradaEfectivo: "EntradaEfectivo";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo[];
}

export interface IEntradaEfectivoContado extends EntradaEfectivo {
    type: string;
    type: string;
    __EntradaEfectivoContado: "EntradaEfectivoContado";
    medioTransferencia?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MedioTransferencia").MedioTransferencia | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoContado").EntradaEfectivoContado>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoContado").EntradaEfectivoContado>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IEntradaEfectivoCredito extends EntradaEfectivo, ICredito<EntradaEfectivoCuota> {
    type: string;
    type: string;
    __EntradaEfectivoCredito: "EntradaEfectivoCredito";
    #credito: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota>;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCredito").EntradaEfectivoCredito>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCredito").EntradaEfectivoCredito>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota): this;
    actualizarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota): this;
    eliminarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota): this;
    getCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota | undefined;
    procesarCredito(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface IEntradaEfectivoCuota extends Cuota {
    type: string;
    type: string;
    __EntradaEfectivoCuota: "EntradaEfectivoCuota";
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCredito").EntradaEfectivoCredito | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivoCuota").EntradaEfectivoCuota>): this;
}

export interface INotaEgresoCredito extends EntradaEfectivo, ICredito<NotaEgresoCuota> {
    type: string;
    type: string;
    __NotaEgresoCredito: "NotaEgresoCredito";
    #credito: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota>;
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgreso").NotaEgreso | null | undefined;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCredito").NotaEgresoCredito>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCredito").NotaEgresoCredito>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota): this;
    actualizarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota): this;
    eliminarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota): this;
    getCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota | undefined;
    procesarInformacion(): this;
    procesarCredito(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface INotaEgresoCuota extends Cuota {
    type: string;
    type: string;
    __NotaEgresoCuota: "NotaEgresoCuota";
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCredito").NotaEgresoCredito | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCuota").NotaEgresoCuota>): this;
}

export interface INotaVentaEntradaEfectivo extends EntradaEfectivo {
    type: string;
    type: string;
    __NotaVentaEntradaEfectivo: "NotaVentaEntradaEfectivo";
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVenta").NotaVenta | null | undefined;
    medioTransferencia?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MedioTransferencia").MedioTransferencia | null | undefined;
    fecha?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IEntradaBienConsumo extends EntradaRecurso {
    type: string;
    type: string;
    __EntradaBienConsumo: "EntradaBienConsumo";
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #cantidadSaliente: number;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo[];
    procesarInformacion(): this;
}

export interface IEntradaBienConsumoValorNuevo extends EntradaBienConsumo {
    type: string;
    type: string;
    __EntradaBienConsumoValorNuevo: "EntradaBienConsumoValorNuevo";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumoValorNuevo").EntradaBienConsumoValorNuevo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumoValorNuevo").EntradaBienConsumoValorNuevo>): this;
}

export interface IEntradaBienConsumoValorSalida extends EntradaBienConsumo {
    type: string;
    type: string;
    __EntradaBienConsumoValorSalida: "EntradaBienConsumoValorSalida";
    salida?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumoValorSalida").EntradaBienConsumoValorSalida>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumoValorSalida").EntradaBienConsumoValorSalida>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface ISalidaRecurso extends MovimientoRecurso {
    type: string;
    type: string;
    __SalidaRecurso: "SalidaRecurso";
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso[];
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaRecurso").SalidaRecurso>): this;
}

export interface ISalidaEfectivo extends SalidaRecurso {
    type: string;
    type: string;
    __SalidaEfectivo: "SalidaEfectivo";
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo>): this;
}

export interface ISalidaEfectivoContado extends SalidaEfectivo {
    type: string;
    type: string;
    __SalidaEfectivoContado: "SalidaEfectivoContado";
    medioTransferencia?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/MedioTransferencia").MedioTransferencia | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoContado").SalidaEfectivoContado>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoContado").SalidaEfectivoContado>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface ISalidaEfectivoCredito extends SalidaEfectivo, ICredito<SalidaEfectivoCuota> {
    type: string;
    type: string;
    __SalidaEfectivoCredito: "SalidaEfectivoCredito";
    #credito: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota>;
    #cuotas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota[] | null | undefined;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCredito").SalidaEfectivoCredito>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCredito").SalidaEfectivoCredito>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota): this;
    actualizarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota): this;
    eliminarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota): this;
    getCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota | undefined;
    procesarInformacion(): this;
    procesarCredito(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface ISalidaEfectivoCuota extends Cuota {
    type: string;
    type: string;
    __SalidaEfectivoCuota: "SalidaEfectivoCuota";
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCredito").SalidaEfectivoCredito | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivoCuota").SalidaEfectivoCuota>): this;
}

export interface INotaIngresoCredito extends SalidaEfectivo, ICredito<NotaIngresoCuota> {
    type: string;
    type: string;
    __NotaIngresoCredito: "NotaIngresoCredito";
    #credito: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Credito").Credito<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota>;
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngreso").NotaIngreso | null | undefined;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCredito").NotaIngresoCredito>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCredito").NotaIngresoCredito>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota): this;
    actualizarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota): this;
    eliminarCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota): this;
    getCuota(cuota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota | undefined;
    procesarInformacion(): this;
    procesarCredito(): this;
    procesarPagos(importeCobrado: number): this;
}

export interface INotaIngresoCuota extends Cuota {
    type: string;
    type: string;
    __NotaIngresoCuota: "NotaIngresoCuota";
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCredito").NotaIngresoCredito | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCuota").NotaIngresoCuota>): this;
}

export interface ISalidaBienConsumo extends SalidaRecurso {
    type: string;
    type: string;
    __SalidaBienConsumo: "SalidaBienConsumo";
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeCostoNeto?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface ISalidaBienConsumoValorNuevo extends SalidaBienConsumo {
    type: string;
    type: string;
    __SalidaBienConsumoValorNuevo: "SalidaBienConsumoValorNuevo";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumoValorNuevo").SalidaBienConsumoValorNuevo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumoValorNuevo").SalidaBienConsumoValorNuevo>): this;
    procesarInformacion(): this;
}

export interface ISalidaBienConsumoValorEntrada extends SalidaBienConsumo {
    type: string;
    type: string;
    __SalidaBienConsumoValorEntrada: "SalidaBienConsumoValorEntrada";
    entrada?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumoValorEntrada").SalidaBienConsumoValorEntrada>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumoValorEntrada").SalidaBienConsumoValorEntrada>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface INotaVentaSalidaBienConsumo extends SalidaBienConsumo {
    type: string;
    type: string;
    __NotaVentaSalidaBienConsumo: "NotaVentaSalidaBienConsumo";
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVenta").NotaVenta | null | undefined;
    #cantidadSaliente?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorBruto?: number | null | undefined;
    #importeValorDescuento?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo>): this;
    procesarInformacion(): this;
}

export interface ISalidaProduccion extends SalidaRecurso {
    type: string;
    type: string;
    __SalidaProduccion: "SalidaProduccion";
    #importeCostoNeto?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion[];
}

export interface ISalidaProduccionBien extends SalidaProduccion {
    type: string;
    type: string;
    __SalidaProduccionBien: "SalidaProduccionBien";
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/SalidaProduccionBien").SalidaProduccionBien[];
    procesarInformacion(): this;
}

export interface ISalidaProduccionBienStandar extends SalidaProduccionBien {
    type: string;
    type: string;
    __SalidaProduccionBienStandar: "SalidaProduccionBienStandar";
    actividades?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienStandar").SalidaProduccionBienStandar>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienStandar").SalidaProduccionBienStandar>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad): this;
    actualizarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad): this;
    eliminarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad): this;
    getActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad | undefined;
}

export interface ISalidaProduccionBienActividad extends Model {
    type: string;
    type: string;
    __SalidaProduccionBienActividad: "SalidaProduccionBienActividad";
    salidaProduccionBienStandar?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienStandar").SalidaProduccionBienStandar | null | undefined;
    numero?: number | null | undefined;
    nombre?: string | null | undefined;
    fechaInicio?: string | null | undefined;
    fechaFinal?: string | null | undefined;
    recursosBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo[] | null | undefined;
    recursosBienCapital?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital[] | null | undefined;
    recursosServicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio[] | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo): this;
    actualizarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo): this;
    eliminarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo): this;
    getRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo | undefined;
    agregarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital): this;
    actualizarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital): this;
    eliminarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital): this;
    getRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital | undefined;
    agregarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio): this;
    actualizarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio): this;
    eliminarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio): this;
    getRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio | undefined;
}

export interface ISalidaProduccionBienRecursoBienConsumo extends Model {
    type: string;
    type: string;
    __SalidaProduccionBienRecursoBienConsumo: "SalidaProduccionBienRecursoBienConsumo";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad | null | undefined;
    numero?: number | null | undefined;
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    cantidad?: number | null | undefined;
    importeCostoUnitario?: number | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienConsumo").SalidaProduccionBienRecursoBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface ISalidaProduccionBienRecursoBienCapital extends Model {
    type: string;
    type: string;
    __SalidaProduccionBienRecursoBienCapital: "SalidaProduccionBienRecursoBienCapital";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad | null | undefined;
    numero?: number | null | undefined;
    bienCapital?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/BienCapital").BienCapital | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoBienCapital").SalidaProduccionBienRecursoBienCapital>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface ISalidaProduccionBienRecursoServicio extends Model {
    type: string;
    type: string;
    __SalidaProduccionBienRecursoServicio: "SalidaProduccionBienRecursoServicio";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienActividad").SalidaProduccionBienActividad | null | undefined;
    numero?: number | null | undefined;
    servicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Bien/Standar/SalidaProduccionBienRecursoServicio").SalidaProduccionBienRecursoServicio>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface ISalidaProduccionServicio extends SalidaProduccion {
    type: string;
    type: string;
    __SalidaProduccionServicio: "SalidaProduccionServicio";
    servicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicio").SalidaProduccionServicio[];
}

export interface ISalidaProduccionServicioStandar extends SalidaProduccionServicio {
    type: string;
    type: string;
    __SalidaProduccionServicioStandar: "SalidaProduccionServicioStandar";
    actividades?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioStandar").SalidaProduccionServicioStandar>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioStandar").SalidaProduccionServicioStandar>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad): this;
    actualizarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad): this;
    eliminarActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad): this;
    getActividad(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad | undefined;
}

export interface ISalidaProduccionServicioActividad extends Model {
    type: string;
    type: string;
    __SalidaProduccionServicioActividad: "SalidaProduccionServicioActividad";
    salidaProduccionServicioStandar?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioStandar").SalidaProduccionServicioStandar | null | undefined;
    numero?: number | null | undefined;
    nombre?: string | null | undefined;
    fechaInicio?: string | null | undefined;
    fechaFinal?: string | null | undefined;
    recursosBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo[] | null | undefined;
    recursosBienCapital?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital[] | null | undefined;
    recursosServicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio[] | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo): this;
    actualizarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo): this;
    eliminarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo): this;
    getRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo | undefined;
    agregarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital): this;
    actualizarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital): this;
    eliminarRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital): this;
    getRecursoBienCapital(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital | undefined;
    agregarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio): this;
    actualizarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio): this;
    eliminarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio): this;
    getRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio | undefined;
}

export interface ISalidaProduccionServicioRecursoBienConsumo extends Model {
    type: string;
    type: string;
    __SalidaProduccionServicioRecursoBienConsumo: "SalidaProduccionServicioRecursoBienConsumo";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad | null | undefined;
    numero?: number | null | undefined;
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    cantidad?: number | null | undefined;
    importeCostoUnitario?: number | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienConsumo").SalidaProduccionServicioRecursoBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface ISalidaProduccionServicioRecursoBienCapital extends Model {
    type: string;
    type: string;
    __SalidaProduccionServicioRecursoBienCapital: "SalidaProduccionServicioRecursoBienCapital";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad | null | undefined;
    numero?: number | null | undefined;
    bienCapital?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/BienCapital").BienCapital | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoBienCapital").SalidaProduccionServicioRecursoBienCapital>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface ISalidaProduccionServicioRecursoServicio extends Model {
    type: string;
    type: string;
    __SalidaProduccionServicioRecursoServicio: "SalidaProduccionServicioRecursoServicio";
    actividad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioActividad").SalidaProduccionServicioActividad | null | undefined;
    numero?: number | null | undefined;
    servicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/Standar/SalidaProduccionServicioRecursoServicio").SalidaProduccionServicioRecursoServicio>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface INotaVentaSalidaProduccionServicioReparacion extends SalidaProduccionServicio {
    type: string;
    type: string;
    __NotaVentaSalidaProduccionServicioReparacion: "NotaVentaSalidaProduccionServicioReparacion";
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVenta").NotaVenta | null | undefined;
    servicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/Servicio").Servicio | null | undefined;
    pantallaModelo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/Pantalla/PantallaModelo").PantallaModelo | null | undefined;
    imei?: string | null | undefined;
    patron?: number | null | undefined;
    contrasena?: string | null | undefined;
    diagnostico?: string | null | undefined;
    recursosBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo[] | null | undefined;
    recursosServicio?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo): this;
    actualizarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo): this;
    eliminarRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo): this;
    getRecursoBienConsumo(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo | undefined;
    agregarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio): this;
    actualizarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio): this;
    eliminarRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio): this;
    getRecursoServicio(recurso: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio | undefined;
}

export interface INotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo extends Model {
    type: string;
    type: string;
    __NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo: "NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo";
    salidaProduccion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion | null | undefined;
    numero?: number | null | undefined;
    fecha?: string | null | undefined;
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    cantidad?: number | null | undefined;
    importeCostoUnitario?: number | null | undefined;
    importeCostoNeto?: number | null | undefined;
    importeValorUnitario?: number | null | undefined;
    importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo").NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface INotaVentaSalidaProduccionServicioReparacionRecursoServicio extends Model {
    type: string;
    type: string;
    __NotaVentaSalidaProduccionServicioReparacionRecursoServicio: "NotaVentaSalidaProduccionServicioReparacionRecursoServicio";
    salidaProduccion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion | null | undefined;
    numero?: number | null | undefined;
    servicioReparacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Servicio/ServicioReparacion/ServicioReparacion").ServicioReparacion | null | undefined;
    descripcion?: string | null | undefined;
    fechaInicio?: string | null | undefined;
    fechaFinal?: string | null | undefined;
    importeCostoNeto?: number | null | undefined;
    importeValorNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacionRecursoServicio").NotaVentaSalidaProduccionServicioReparacionRecursoServicio>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IDocumentoFuente extends Model {
    type: string;
    type: string;
    __DocumentoFuente: "DocumentoFuente";
    codigoSerie?: string | null | undefined;
    codigoNumero?: number | null | undefined;
    concepto?: string | null | undefined;
    fechaCreacion?: string | null | undefined;
    fechaActualizacion?: string | null | undefined;
    fechaEmision?: string | null | undefined;
    fechaAnulacion?: string | null | undefined;
    usuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null | undefined;
    notas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/Nota/Nota").Nota[] | null | undefined;
    importeNeto?: number | null | undefined;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarNota(nota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/Nota/Nota").Nota): this;
    eliminarNota(nota: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/Nota/Nota").Nota): this;
    crearYemitir(): this;
    anular(): this;
    procesarInformacion(): this;
    procesarEstado(): this;
    toRecordKardexBienConsumo(record: Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>;
}

export interface INota extends Model {
    type: string;
    type: string;
    __Nota: "Nota";
    numero?: number | null | undefined;
    fecha?: string | null | undefined;
    descripcion?: string | null | undefined;
    documentoFuente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoFuente").DocumentoFuente | null | undefined;
    usuario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/Nota/Nota").Nota>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/Nota/Nota").Nota>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IDocumentoMovimiento extends DocumentoFuente {
    type: string;
    type: string;
    __DocumentoMovimiento: "DocumentoMovimiento";
    documentoTransaccion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/DocumentoMovimiento").DocumentoMovimiento[];
}

export interface IDocumentoEntrada extends DocumentoMovimiento {
    type: string;
    type: string;
    __DocumentoEntrada: "DocumentoEntrada";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntrada").DocumentoEntrada[];
}

export interface IDocumentoEntradaEfectivo extends DocumentoEntrada {
    type: string;
    type: string;
    __DocumentoEntradaEfectivo: "DocumentoEntradaEfectivo";
    entradas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo): this;
    actualizarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo): this;
    eliminarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo): this;
    getEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/EntradaEfectivo").EntradaEfectivo | undefined;
}

export interface IDocumentoEntradaBienConsumo extends DocumentoEntrada {
    type: string;
    type: string;
    __DocumentoEntradaBienConsumo: "DocumentoEntradaBienConsumo";
    entradas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo): this;
    actualizarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo): this;
    eliminarEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo): this;
    getEntrada(entrada: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaBienConsumo/EntradaBienConsumo").EntradaBienConsumo | undefined;
    toRecordKardexBienConsumo(record: Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>;
}

export interface IDocumentoSalida extends DocumentoMovimiento {
    type: string;
    type: string;
    __DocumentoSalida: "DocumentoSalida";
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida>): this;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalida").DocumentoSalida[];
}

export interface IDocumentoSalidaEfectivo extends DocumentoSalida {
    type: string;
    type: string;
    __DocumentoSalidaEfectivo: "DocumentoSalidaEfectivo";
    salidas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo): this;
    actualizarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo): this;
    eliminarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo): this;
    getSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/SalidaEfectivo").SalidaEfectivo | undefined;
}

export interface IDocumentoSalidaBienConsumo extends DocumentoSalida {
    type: string;
    type: string;
    __DocumentoSalidaBienConsumo: "DocumentoSalidaBienConsumo";
    salidas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo[] | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo): this;
    actualizarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo): this;
    eliminarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo): this;
    getSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/SalidaBienConsumo").SalidaBienConsumo | undefined;
    toRecordKardexBienConsumo(record: Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>;
}

export interface IDocumentoSalidaProduccion extends DocumentoSalida {
    type: string;
    type: string;
    __DocumentoSalidaProduccion: "DocumentoSalidaProduccion";
    salidas?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion[] | null | undefined;
    importeCostoNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaProduccion").DocumentoSalidaProduccion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaProduccion").DocumentoSalidaProduccion>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
    agregarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion): this;
    actualizarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion): this;
    eliminarSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion): this;
    getSalida(salida: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/SalidaProduccion").SalidaProduccion | undefined;
}

export interface IDocumentoTransaccion extends DocumentoFuente {
    type: string;
    type: string;
    __DocumentoTransaccion: "DocumentoTransaccion";
    docsEntradaEfectivo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo[] | null | undefined;
    docsEntradaBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo[] | null | undefined;
    docsSalidaEfectivo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo[] | null | undefined;
    docsSalidaBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo[] | null | undefined;
    importeValorEntradaEfectivo?: number | null | undefined;
    importeValorEntradaBienConsumo?: number | null | undefined;
    importeValorSalidaEfectivo?: number | null | undefined;
    importeCostoSalidaBienConsumo?: number | null | undefined;
    importeValorSalidaBienConsumo?: number | null | undefined;
    importeCostoSalidaProduccion?: number | null | undefined;
    importeValorSalidaProduccion?: number | null | undefined;
    importeBruto?: number | null | undefined;
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoTransaccion").DocumentoTransaccion>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarDocEntradaEfectivo(docEntradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo): this;
    actualizarDocEntradaEfectivo(docEntradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo): this;
    eliminarDocEntradaEfectivo(docEntradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo): this;
    getDocEntradaEfectivo(docEntradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaEfectivo").DocumentoEntradaEfectivo | undefined;
    agregarDocEntradaBienConsumo(docEntradaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo): this;
    actualizarDocEntradaBienConsumo(docEntradaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo): this;
    eliminarDocEntradaBienConsumo(docEntradaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo): this;
    getDocEntradaBienConsumo(docEntradaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Entrada/DocumentoEntradaBienConsumo").DocumentoEntradaBienConsumo | undefined;
    agregarDocSalidaEfectivo(docSalidaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo): this;
    actualizarDocSalidaEfectivo(docSalidaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo): this;
    eliminarDocSalidaEfectivo(docSalidaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo): this;
    getDocSalidaEfectivo(docSalidaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaEfectivo").DocumentoSalidaEfectivo | undefined;
    agregarDocSalidaBienConsumo(docSalidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo): this;
    actualizarDocSalidaBienConsumo(docSalidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo): this;
    eliminarDocSalidaBienConsumo(docSalidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo): this;
    getDocSalidaBienConsumo(docSalidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoMovimiento/Salida/DocumentoSalidaBienConsumo").DocumentoSalidaBienConsumo | undefined;
    crear(): this;
    actualizar(): this;
    emitir(): this;
    procesarEstado(): this;
    procesarInformacion(): this;
    procesarInformacionEntrada(): this;
    procesarInformacionSalida(): this;
    toRecordKardexBienConsumo(record: Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>;
}

export interface ILiquidacionTipo extends Model {
    type: string;
    type: string;
    __LiquidacionTipo: "LiquidacionTipo";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/LiquidacionTipo").LiquidacionTipo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/LiquidacionTipo").LiquidacionTipo>): this;
}

export interface IDocumentoEgreso extends DocumentoTransaccion {
    type: string;
    type: string;
    __DocumentoEgreso: "DocumentoEgreso";
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/DocumentoEgreso").DocumentoEgreso>): this;
}

export interface IDocumentoIngreso extends DocumentoTransaccion {
    type: string;
    type: string;
    __DocumentoIngreso: "DocumentoIngreso";
    initialize(data: TItem[]): unknown extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso | null)[] : null extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso | (TItem & null))[] : undefined extends TItem ? (import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso | null)[] : import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso[];
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/DocumentoIngreso").DocumentoIngreso>): this;
}

export interface IComprobanteTipo extends Model {
    type: string;
    type: string;
    __ComprobanteTipo: "ComprobanteTipo";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/ComprobanteTipo").ComprobanteTipo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/ComprobanteTipo").ComprobanteTipo>): this;
}

export interface INotaEgreso extends DocumentoTransaccion {
    type: string;
    type: string;
    __NotaEgreso: "NotaEgreso";
    comprobanteTipo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/ComprobanteTipo").ComprobanteTipo | null | undefined;
    comprobanteCodigoSerie?: string | null | undefined;
    comprobanteCodigoNumero?: number | null | undefined;
    proveedor?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null | undefined;
    proveedorDocumentoIdentificacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/DocumentoIdentificacion").DocumentoIdentificacion | null | undefined;
    proveedorCodigo?: string | null | undefined;
    proveedorNombre?: string | null | undefined;
    proveedorCelular?: number | null | undefined;
    liquidacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/LiquidacionTipo").LiquidacionTipo | null | undefined;
    detalles?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle[] | null | undefined;
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaEgresoCredito").NotaEgresoCredito | null | undefined;
    importeBruto?: number | null | undefined;
    importeDescuento?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgreso").NotaEgreso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgreso").NotaEgreso>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle): this;
    actualizarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle): this;
    eliminarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle): this;
    getDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle | undefined;
    procesarInformacion(): this;
}

export interface INotaEgresoDetalle extends Model {
    type: string;
    type: string;
    __NotaEgresoDetalle: "NotaEgresoDetalle";
    notaEgreso?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgreso").NotaEgreso | null | undefined;
    numero?: number | null | undefined;
    recurso?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso | null | undefined;
    concepto?: string | null | undefined;
    cantidad?: number | null | undefined;
    importeUnitario?: number | null | undefined;
    importeBruto?: number | null | undefined;
    importeDescuento?: number | null | undefined;
    importeNeto?: number | null | undefined;
    comentario?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoEgreso/NotaEgreso/NotaEgresoDetalle").NotaEgresoDetalle>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface INotaIngreso extends DocumentoTransaccion {
    type: string;
    type: string;
    __NotaIngreso: "NotaIngreso";
    cliente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null | undefined;
    clienteDocumentoIdentificacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/DocumentoIdentificacion").DocumentoIdentificacion | null | undefined;
    clienteCodigo?: string | null | undefined;
    clienteNombre?: string | null | undefined;
    clienteCelular?: number | null | undefined;
    liquidacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/LiquidacionTipo").LiquidacionTipo | null | undefined;
    detalles?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle[] | null | undefined;
    credito?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaEfectivo/NotaIngresoCredito").NotaIngresoCredito | null | undefined;
    importeBruto?: number | null | undefined;
    importeDescuento?: number | null | undefined;
    importeNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngreso").NotaIngreso>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngreso").NotaIngreso>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    agregarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle): this;
    actualizarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle): this;
    eliminarDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle): this;
    getDetalle(detalle: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle | undefined;
    procesarInformacion(): this;
}

export interface INotaIngresoDetalle extends Model {
    type: string;
    type: string;
    __NotaIngresoDetalle: "NotaIngresoDetalle";
    notaIngreso?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngreso").NotaIngreso | null | undefined;
    numero?: number | null | undefined;
    recurso?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Recurso").Recurso | null | undefined;
    concepto?: string | null | undefined;
    cantidad?: number | null | undefined;
    importeUnitario?: number | null | undefined;
    importeBruto?: number | null | undefined;
    importeDescuento?: number | null | undefined;
    importeNeto?: number | null | undefined;
    comentario?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaIngreso/NotaIngresoDetalle").NotaIngresoDetalle>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacion(): this;
}

export interface INotaVenta extends DocumentoTransaccion {
    type: string;
    type: string;
    __NotaVenta: "NotaVenta";
    fechaCompromiso?: string | null | undefined;
    cliente?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Personas/Persona").Persona | null | undefined;
    prioridad?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaPrioridad").NotaVentaPrioridad | null | undefined;
    usuarioTecnico?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Usuarios/Usuario").Usuario | null | undefined;
    estado?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaEstado").NotaVentaEstado | null | undefined;
    salidasBienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo[] | null | undefined;
    salidasProduccionServicioReparacion?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion[] | null | undefined;
    entradasEfectivo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo[] | null | undefined;
    importeBruto?: number | null | undefined;
    importeDescuento?: number | null | undefined;
    importeInicial?: number | null | undefined;
    importeAdicional?: number | null | undefined;
    importeNeto?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVenta").NotaVenta>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVenta").NotaVenta>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
    procesarInformacionEntrada(): this;
    procesarInformacionSalida(): this;
    agregarSalidaBienConsumo(salidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo): this;
    actualizarSalidaBienConsumo(salidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo): this;
    eliminarSalidaBienConsumo(salidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo): this;
    getSalidaBienConsumo(salidaBienConsumo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaBienConsumo/NotaVentaSalidaBienConsumo").NotaVentaSalidaBienConsumo | undefined;
    agregarSalidaProduccionServicioReparacion(salidaProduccionServicioReparacion: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion): this;
    actualizarSalidaProduccionServicioReparacion(salidaProduccionServicioReparacion: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion): this;
    eliminarSalidaProduccionServicioReparacion(salidaProduccionServicioReparacion: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion): this;
    getSalidaProduccionServicioReparacion(salidaProduccionServicioReparacion: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Salida/SalidaProduccion/Servicio/SalidaProduccionServicioReparacion/NotaVentaSalidaProduccionServicioReparacion").NotaVentaSalidaProduccionServicioReparacion | undefined;
    agregarEntradaEfectivo(entradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo): this;
    actualizarEntradaEfectivo(entradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo): this;
    eliminarEntradaEfectivo(entradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo): this;
    getEntradaEfectivo(entradaEfectivo: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo): import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/MovimientosRecursos/Entrada/EntradaEfectivo/NotaVentaEntradaEfectivo").NotaVentaEntradaEfectivo | undefined;
    toRecordKardexBienConsumo(record: Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): Record<string, import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>;
}

export interface INotaVentaPrioridad extends Model {
    type: string;
    type: string;
    __NotaVentaPrioridad: "NotaVentaPrioridad";
    nombre?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaPrioridad").NotaVentaPrioridad>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaPrioridad").NotaVentaPrioridad>): this;
}

export interface INotaVentaEstado extends Model {
    type: string;
    type: string;
    __NotaVentaEstado: "NotaVentaEstado";
    numero?: number | null | undefined;
    nombre?: string | null | undefined;
    colorHexadecimal?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaEstado").NotaVentaEstado>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/DocumentosFuente/DocumentoTransaccion/DocumentoIngreso/NotaVenta/NotaVentaEstado").NotaVentaEstado>): this;
}

export interface IKardexLock extends Model {
    type: string;
    type: string;
    __KardexLock: "KardexLock";
    clave?: string | null | undefined;
    fecha?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/KardexLock").KardexLock>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/KardexLock").KardexLock>): this;
}

export interface IInventarioBienConsumo extends Model {
    type: string;
    type: string;
    __InventarioBienConsumo: "InventarioBienConsumo";
    kardexs?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo[] | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/InventarioBienConsumo").InventarioBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/InventarioBienConsumo").InventarioBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IKardexBienConsumo extends Model {
    type: string;
    type: string;
    __KardexBienConsumo: "KardexBienConsumo";
    inventario?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/InventarioBienConsumo").InventarioBienConsumo | null | undefined;
    almacen?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienCapital/Almacen").Almacen | null | undefined;
    bienConsumo?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Recursos/Bien/BienConsumo/BienConsumo").BienConsumo | null | undefined;
    eventosPendientes?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/EventoPendienteKardexBienConsumo").EventoPendienteKardexBienConsumo[] | null | undefined;
    errores?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/ErrorKardexBienConsumo").ErrorKardexBienConsumo[] | null | undefined;
    movimientos?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumoMovimiento").KardexBienConsumoMovimiento[] | null | undefined;
    fechaCreacion?: string | null | undefined;
    fechaActualizacion?: string | null | undefined;
    entradaCantidadAcumulado?: number | null | undefined;
    entradaCostoAcumulado?: number | null | undefined;
    salidaCantidadAcumulado?: number | null | undefined;
    salidaCostoAcumulado?: number | null | undefined;
    saldoCantidad?: number | null | undefined;
    saldoValorUnitario?: number | null | undefined;
    saldoValorTotal?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IKardexBienConsumoMovimiento extends Model {
    type: string;
    type: string;
    __KardexBienConsumoMovimiento: "KardexBienConsumoMovimiento";
    kardex?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo | null | undefined;
    numero?: number | null | undefined;
    referenciaUuid?: string | null | undefined;
    movimientoTipo?: string | null | undefined;
    fecha?: string | null | undefined;
    documentoFuenteCodigoSerie?: string | null | undefined;
    documentoFuenteCodigoNumero?: number | null | undefined;
    movimientoNumero?: number | null | undefined;
    concepto?: string | null | undefined;
    entradaCantidad?: number | null | undefined;
    entradaCostoUnitario?: number | null | undefined;
    entradaCostoTotal?: number | null | undefined;
    entradaCantidadAcumulado?: number | null | undefined;
    entradaCostoAcumulado?: number | null | undefined;
    salidaCantidad?: number | null | undefined;
    salidaCostoUnitario?: number | null | undefined;
    salidaCostoTotal?: number | null | undefined;
    salidaCantidadAcumulado?: number | null | undefined;
    salidaCostoAcumulado?: number | null | undefined;
    saldoCantidad?: number | null | undefined;
    saldoValorUnitario?: number | null | undefined;
    saldoValorTotal?: number | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumoMovimiento").KardexBienConsumoMovimiento>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumoMovimiento").KardexBienConsumoMovimiento>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IEventoPendienteKardexBienConsumo extends Model {
    type: string;
    type: string;
    __EventoPendienteKardexBienConsumo: "EventoPendienteKardexBienConsumo";
    kardex?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo | null | undefined;
    evento?: string | null | undefined;
    data?: Record<any, any> | null | undefined;
    fecha?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/EventoPendienteKardexBienConsumo").EventoPendienteKardexBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/EventoPendienteKardexBienConsumo").EventoPendienteKardexBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}

export interface IErrorKardexBienConsumo extends Model {
    type: string;
    type: string;
    __ErrorKardexBienConsumo: "ErrorKardexBienConsumo";
    kardex?: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/KardexBienConsumo").KardexBienConsumo | null | undefined;
    numero?: number | null | undefined;
    mensaje?: string | null | undefined;
    fecha?: string | null | undefined;
    set(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/ErrorKardexBienConsumo").ErrorKardexBienConsumo>): this;
    assign(item: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/types").OptionalModel<import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/lib/Inventario/BienConsumo/ErrorKardexBienConsumo").ErrorKardexBienConsumo>): this;
    setRelation(context: import("D:/CONFIXCELL/Sistema/Componentes/modelos/src/utils/ExecutionContext").ExecutionContext): this;
}
