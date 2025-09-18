interface IUtility {
}

interface ICast extends IUtility {
}

interface IProporcion {
    tipo: TipoProporcion;
    antecedente: number;
    consecuente: number;
}

interface IExecutionContext {
    executed: Map<object, Set<string>>;
}

interface IContextRecord {
    record;
}

interface IUtilModels {
}

interface IUtilPropertyDescriptor {
    getAllProperties;
    getReadableProperties;
    getReadOnlyProperties;
    getWritableProperties;
    getWriteOnlyProperties;
    getReadWriteProperties;
    getAllPropertyNames;
    getReadablePropertyNames;
    getReadOnlyPropertyNames;
    getWritablePropertyNames;
    getWriteOnlyPropertyNames;
    getReadWritePropertyNames;
    isReadonly;
    getConstructor;
}

interface IModel extends IImmutable {
    type;
    type;
    __Model: 'Model';
    symbol: symbol;
    uuid?: string | null;
}

interface IMetadataPresetRecord extends IImmutable {
    type;
    type;
    __MetadataPresetRecord: 'MetadataPresetRecord';
    value?: TValue | null;
    descripcion: string;
    model?: TModel | null;
}

interface IPresetRecord extends IModel {
    type;
    type;
    __PresetRecord: 'PresetRecord';
    almacenDeBienesDeConsumoDeNotaVenta: MetadataPresetSchema<String, Almacen>;
    almacenDeRecursosBienDeConsumoDeNotaVenta: MetadataPresetSchema<String, Almacen>;
    servicioDeReparacionDeNotaVenta: MetadataPresetSchema<String, Servicio>;
    almacenDeBienesDeConsumoDeNotaVenta: MetadataPresetRecord<string, Almacen>;
    almacenDeRecursosBienDeConsumoDeNotaVenta: MetadataPresetRecord<string, Almacen>;
    servicioDeReparacionDeNotaVenta: MetadataPresetRecord<string, Servicio>;
}

interface IUsuario extends IModel {
    type;
    type;
    __Usuario: 'Usuario';
    correo?: string | null;
    contrasena?: string | null;
    nombre?: string | null;
    esActivo?: boolean | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
}

interface ISuperUsuario extends IUsuario {
    type;
    type;
    __SuperUsuario: 'SuperUsuario';
    empresa?: SuperUsuarioEmpresa | null;
    preset?: Preset | null;
    subUsuarios?: SubUsuario[] | null;
}

interface ISuperUsuarioEmpresa extends IModel {
    type;
    type;
    __SuperUsuarioEmpresa: 'SuperUsuarioEmpresa';
    razonSocial?: string | null;
    ruc?: string | null;
    celular?: number | null;
    domicilio?: string | null;
    superUsuario?: SuperUsuario | null;
}

interface IPreset extends IModel {
    type;
    type;
    __Preset: 'Preset';
    json?: Record<string, any> | null;
    superUsuario?: SuperUsuario | null;
}

interface ISubUsuario extends IUsuario {
    type;
    type;
    __SubUsuario: 'SubUsuario';
    persona?: Persona | null;
    creadoPor?: Usuario | null;
    superUsuario?: SuperUsuario | null;
    roles?: Rol[] | null;
}

interface IRol extends IModel {
    type;
    type;
    __Rol: 'Rol';
    nombre?: string | null;
    descripcion?: string | null;
    permisos?: Permiso[] | null;
    subUsuario?: SubUsuario | null;
}

interface IPermiso extends IModel {
    type;
    type;
    __Permiso: 'Permiso';
    nombre?: string | null;
    descripcion?: string | null;
    rol?: Rol | null;
}

interface IRecurso extends IModel {
    type;
    type;
    __Recurso: 'Recurso';
    codigo?: string | null;
    esEscribible?: boolean | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
}

interface IBien extends IRecurso {
    type;
    type;
    __Bien: 'Bien';
    precioUnitario?: number | null;
}

interface IBienConsumo extends IBien {
    type;
    type;
    __BienConsumo: 'BienConsumo';
}

interface ICalidad extends IModel {
    type;
    type;
    __Calidad: 'Calidad';
    nombre?: string | null;
}

interface IPantallaMarca extends IModel {
    type;
    type;
    __PantallaMarca: 'PantallaMarca';
    nombre?: string | null;
}

interface IPantallaModelo extends IModel {
    type;
    type;
    __PantallaModelo: 'PantallaModelo';
    nombre?: string | null;
    marca?: PantallaMarca | null;
}

interface IPantallaModeloCalidad extends IBienConsumo {
    type;
    type;
    __PantallaModeloCalidad: 'PantallaModeloCalidad';
    modelo?: PantallaModelo | null;
    calidad?: Calidad | null;
}

interface IProductoCategoria extends IModel {
    type;
    type;
    __ProductoCategoria: 'ProductoCategoria';
    nombre?: string | null;
}

interface IProductoMarca extends IModel {
    type;
    type;
    __ProductoMarca: 'ProductoMarca';
    nombre?: string | null;
}

interface IMagnitud extends IModel {
    type;
    type;
    __Magnitud: 'Magnitud';
    nombre?: string | null;
}

interface IProducto extends IBienConsumo {
    type;
    type;
    __Producto: 'Producto';
    nombre?: string | null;
    marca?: ProductoMarca | null;
    magnitud?: Magnitud | null;
    categoria?: ProductoCategoria | null;
}

interface IBienCapital extends IBien {
    type;
    type;
    __BienCapital: 'BienCapital';
    bienConsumo?: BienConsumo | null;
    numero?: number | null;
    descripcion?: string | null;
}

interface IAlmacen extends IModel {
    type;
    type;
    __Almacen: 'Almacen';
    nombre?: string | null;
    bienCapital?: BienCapital | null;
}

interface IServicio extends IRecurso {
    type;
    type;
    __Servicio: 'Servicio';
}

interface IServicioEstandar extends IRecurso {
    type;
    type;
    __ServicioEstandar: 'ServicioEstandar';
    nombre?: string | null;
    categoria?: ServicioEstandarCategoria | null;
    precioUnitario?: number | null;
}

interface IServicioEstandarCategoria extends IModel {
    type;
    type;
    __ServicioEstandarCategoria: 'ServicioEstandarCategoria';
    nombre?: string | null;
}

interface IServicioReparacion extends IRecurso {
    type;
    type;
    __ServicioReparacion: 'ServicioReparacion';
    nombre?: string | null;
}

interface IPersona extends IModel {
    type;
    type;
    __Persona: 'Persona';
    subUsuario?: SubUsuario | null;
    documentoIdentificacion?: DocumentoIdentificacion | null;
    codigo?: string | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
}

interface IGenero extends IModel {
    type;
    type;
    __Genero: 'Genero';
    nombre?: string | null;
}

interface IDocumentoIdentificacion extends IModel {
    type;
    type;
    __DocumentoIdentificacion: 'DocumentoIdentificacion';
    nombre?: string | null;
}

interface IPersonaNatural extends IPersona {
    type;
    type;
    __PersonaNatural: 'PersonaNatural';
    nombre?: string | null;
    apellido?: string | null;
    genero?: Genero | null;
    domicilio?: string | null;
    celular?: number | null;
    celularRespaldo?: number | null;
}

interface IPersonaJuridica extends IPersona {
    type;
    type;
    __PersonaJuridica: 'PersonaJuridica';
    nombre?: string | null;
    domicilio?: string | null;
    celular?: number | null;
}

interface IPoliticaComercial extends IModel {
    type;
    type;
    __PoliticaComercial: 'PoliticaComercial';
    numero?: number | null;
    descripcion?: string | null;
    esActivo?: boolean | null;
}

interface IMovimientoRecurso extends IModel {
    type;
    type;
    __MovimientoRecurso: 'MovimientoRecurso';
    documentoFuente?: DocumentoFuente | null;
    numero?: number | null;
    #importeValorNeto?: number | null | undefined;
}

interface IMedioTransferencia extends IModel {
    type;
    type;
    __MedioTransferencia: 'MedioTransferencia';
    nombre?: string | null;
}

interface ICredito extends IModel  implements ICredito<TCuota> {
    type;
    type;
    __Credito: 'Credito';
    context?: ICredito<TCuota>;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: TCuota[] | null | undefined;
    #decimalDuracionMinutos;
    #interesXminuto;
    #amortizacionXminuto;
    #cuotaXminuto;
}

interface ICuota extends IModel {
    type;
    type;
    __Cuota: 'Cuota';
    credito?: ICredito<Cuota> | null;
    numero?: number | null;
    fechaInicio?: string | null;
    fechaVencimiento?: string | null;
    duracionMinutos?: number | null;
    importeInteres?: number | null;
    importeAmortizacion?: number | null;
    importeCuota?: number | null;
    importeSaldo?: number | null;
    esActivoMora: boolean;
    fechaLimiteMora?: string | null;
    importeMora?: number | null;
    importeCobrado?: number | null;
    importePorCobrar?: number | null;
    porcentajeCobrado?: number | null;
    porcentajePorCobrar?: number | null;
}

interface IEntradaRecurso extends IMovimientoRecurso {
    type;
    type;
    __EntradaRecurso: 'EntradaRecurso';
    #importeValorNeto?: number | null | undefined;
}

interface IEntradaEfectivo extends IEntradaRecurso {
    type;
    type;
    __EntradaEfectivo: 'EntradaEfectivo';
}

interface IEntradaEfectivoContado extends IEntradaEfectivo {
    type;
    type;
    __EntradaEfectivoContado: 'EntradaEfectivoContado';
    medioTransferencia?: MedioTransferencia | null;
}

interface IEntradaEfectivoCredito extends IEntradaEfectivo  implements ICredito<EntradaEfectivoCuota> {
    type;
    type;
    __EntradaEfectivoCredito: 'EntradaEfectivoCredito';
    #credito: Credito<EntradaEfectivoCuota>;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: EntradaEfectivoCuota[] | null | undefined;
}

interface IEntradaEfectivoCuota extends ICuota {
    type;
    type;
    __EntradaEfectivoCuota: 'EntradaEfectivoCuota';
    credito?: EntradaEfectivoCredito | null;
}

interface INotaEgresoCredito extends IEntradaEfectivo  implements ICredito<NotaEgresoCuota> {
    type;
    type;
    __NotaEgresoCredito: 'NotaEgresoCredito';
    #credito: Credito<NotaEgresoCuota>;
    documentoFuente?: NotaEgreso | null;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: NotaEgresoCuota[] | null | undefined;
}

interface INotaEgresoCuota extends ICuota {
    type;
    type;
    __NotaEgresoCuota: 'NotaEgresoCuota';
    credito?: NotaEgresoCredito | null;
}

interface INotaVentaEntradaEfectivo extends IEntradaEfectivo {
    type;
    type;
    __NotaVentaEntradaEfectivo: 'NotaVentaEntradaEfectivo';
    documentoFuente?: NotaVenta | null;
    medioTransferencia?: MedioTransferencia | null;
    fecha?: string | null;
}

interface IEntradaBienConsumo extends IEntradaRecurso {
    type;
    type;
    __EntradaBienConsumo: 'EntradaBienConsumo';
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    #cantidadEntrante?: number | null | undefined;
    #cantidadSaliente: number;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
}

interface IEntradaBienConsumoValorNuevo extends IEntradaBienConsumo {
    type;
    type;
    __EntradaBienConsumoValorNuevo: 'EntradaBienConsumoValorNuevo';
}

interface IEntradaBienConsumoValorSalida extends IEntradaBienConsumo {
    type;
    type;
    __EntradaBienConsumoValorSalida: 'EntradaBienConsumoValorSalida';
    salida?: SalidaBienConsumo | null;
}

interface ISalidaRecurso extends IMovimientoRecurso {
    type;
    type;
    __SalidaRecurso: 'SalidaRecurso';
    #importeValorNeto?: number | null | undefined;
}

interface ISalidaEfectivo extends ISalidaRecurso {
    type;
    type;
    __SalidaEfectivo: 'SalidaEfectivo';
}

interface ISalidaEfectivoContado extends ISalidaEfectivo {
    type;
    type;
    __SalidaEfectivoContado: 'SalidaEfectivoContado';
    medioTransferencia?: MedioTransferencia | null;
}

interface ISalidaEfectivoCredito extends ISalidaEfectivo  implements ICredito<SalidaEfectivoCuota> {
    type;
    type;
    __SalidaEfectivoCredito: 'SalidaEfectivoCredito';
    #credito: Credito<SalidaEfectivoCuota>;
    #cuotas?: SalidaEfectivoCuota[] | null | undefined;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
}

interface ISalidaEfectivoCuota extends ICuota {
    type;
    type;
    __SalidaEfectivoCuota: 'SalidaEfectivoCuota';
    credito?: SalidaEfectivoCredito | null;
}

interface INotaIngresoCredito extends ISalidaEfectivo  implements ICredito<NotaIngresoCuota> {
    type;
    type;
    __NotaIngresoCredito: 'NotaIngresoCredito';
    #credito: Credito<NotaIngresoCuota>;
    documentoFuente?: NotaIngreso | null;
    #importeValorNeto?: number | null | undefined;
    #tasaInteresDiario?: number | null | undefined;
    #importeInteres?: number | null | undefined;
    #porcentajeInteres?: number | null | undefined;
    #importeValorFinal?: number | null | undefined;
    #cuotas?: NotaIngresoCuota[] | null | undefined;
}

interface INotaIngresoCuota extends ICuota {
    type;
    type;
    __NotaIngresoCuota: 'NotaIngresoCuota';
    credito?: NotaIngresoCredito | null;
}

interface ISalidaBienConsumo extends ISalidaRecurso {
    type;
    type;
    __SalidaBienConsumo: 'SalidaBienConsumo';
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeCostoNeto?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
}

interface ISalidaBienConsumoValorNuevo extends ISalidaBienConsumo {
    type;
    type;
    __SalidaBienConsumoValorNuevo: 'SalidaBienConsumoValorNuevo';
}

interface ISalidaBienConsumoValorEntrada extends ISalidaBienConsumo {
    type;
    type;
    __SalidaBienConsumoValorEntrada: 'SalidaBienConsumoValorEntrada';
    entrada?: EntradaBienConsumo | null;
}

interface INotaVentaSalidaBienConsumo extends ISalidaBienConsumo {
    type;
    type;
    __NotaVentaSalidaBienConsumo: 'NotaVentaSalidaBienConsumo';
    documentoFuente?: NotaVenta | null;
    #cantidadSaliente?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
    #importeValorBruto?: number | null | undefined;
    #importeValorDescuento?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
}

interface ISalidaProduccion extends ISalidaRecurso {
    type;
    type;
    __SalidaProduccion: 'SalidaProduccion';
    #importeCostoNeto?: number | null | undefined;
    #importeValorNeto?: number | null | undefined;
}

interface ISalidaProduccionBien extends ISalidaProduccion {
    type;
    type;
    __SalidaProduccionBien: 'SalidaProduccionBien';
    bienConsumo?: BienConsumo | null;
    #cantidadSaliente?: number | null | undefined;
    #cantidadEntrante?: number | null | undefined;
    #importeCostoUnitario?: number | null | undefined;
    #importeValorUnitario?: number | null | undefined;
}

interface ISalidaProduccionBienStandar extends ISalidaProduccionBien {
    type;
    type;
    __SalidaProduccionBienStandar: 'SalidaProduccionBienStandar';
    actividades?: SalidaProduccionBienActividad[] | null;
}

interface ISalidaProduccionBienActividad extends IModel {
    type;
    type;
    __SalidaProduccionBienActividad: 'SalidaProduccionBienActividad';
    salidaProduccionBienStandar?: SalidaProduccionBienStandar | null;
    numero?: number | null;
    nombre?: string | null;
    fechaInicio?: string | null;
    fechaFinal?: string | null;
    recursosBienConsumo?: SalidaProduccionBienRecursoBienConsumo[] | null;
    recursosBienCapital?: SalidaProduccionBienRecursoBienCapital[] | null;
    recursosServicio?: SalidaProduccionBienRecursoServicio[] | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionBienRecursoBienConsumo extends IModel {
    type;
    type;
    __SalidaProduccionBienRecursoBienConsumo: 'SalidaProduccionBienRecursoBienConsumo';
    actividad?: SalidaProduccionBienActividad | null;
    numero?: number | null;
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    cantidad?: number | null;
    importeCostoUnitario?: number | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionBienRecursoBienCapital extends IModel {
    type;
    type;
    __SalidaProduccionBienRecursoBienCapital: 'SalidaProduccionBienRecursoBienCapital';
    actividad?: SalidaProduccionBienActividad | null;
    numero?: number | null;
    bienCapital?: BienCapital | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionBienRecursoServicio extends IModel {
    type;
    type;
    __SalidaProduccionBienRecursoServicio: 'SalidaProduccionBienRecursoServicio';
    actividad?: SalidaProduccionBienActividad | null;
    numero?: number | null;
    servicio?: Servicio | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionServicio extends ISalidaProduccion {
    type;
    type;
    __SalidaProduccionServicio: 'SalidaProduccionServicio';
    servicio?: Servicio | null;
}

interface ISalidaProduccionServicioStandar extends ISalidaProduccionServicio {
    type;
    type;
    __SalidaProduccionServicioStandar: 'SalidaProduccionServicioStandar';
    actividades?: SalidaProduccionServicioActividad[] | null;
}

interface ISalidaProduccionServicioActividad extends IModel {
    type;
    type;
    __SalidaProduccionServicioActividad: 'SalidaProduccionServicioActividad';
    salidaProduccionServicioStandar?: SalidaProduccionServicioStandar | null;
    numero?: number | null;
    nombre?: string | null;
    fechaInicio?: string | null;
    fechaFinal?: string | null;
    recursosBienConsumo?: SalidaProduccionServicioRecursoBienConsumo[] | null;
    recursosBienCapital?: SalidaProduccionServicioRecursoBienCapital[] | null;
    recursosServicio?: SalidaProduccionServicioRecursoServicio[] | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionServicioRecursoBienConsumo extends IModel {
    type;
    type;
    __SalidaProduccionServicioRecursoBienConsumo: 'SalidaProduccionServicioRecursoBienConsumo';
    actividad?: SalidaProduccionServicioActividad | null;
    numero?: number | null;
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    cantidad?: number | null;
    importeCostoUnitario?: number | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionServicioRecursoBienCapital extends IModel {
    type;
    type;
    __SalidaProduccionServicioRecursoBienCapital: 'SalidaProduccionServicioRecursoBienCapital';
    actividad?: SalidaProduccionServicioActividad | null;
    numero?: number | null;
    bienCapital?: BienCapital | null;
    importeCostoNeto?: number | null;
}

interface ISalidaProduccionServicioRecursoServicio extends IModel {
    type;
    type;
    __SalidaProduccionServicioRecursoServicio: 'SalidaProduccionServicioRecursoServicio';
    actividad?: SalidaProduccionServicioActividad | null;
    numero?: number | null;
    servicio?: Servicio | null;
    importeCostoNeto?: number | null;
}

interface INotaVentaSalidaProduccionServicioReparacion extends ISalidaProduccionServicio {
    type;
    type;
    __NotaVentaSalidaProduccionServicioReparacion: 'NotaVentaSalidaProduccionServicioReparacion';
    documentoFuente?: NotaVenta | null;
    servicio?: Servicio | null;
    pantallaModelo?: PantallaModelo | null;
    imei?: string | null;
    patron?: number | null;
    contrasena?: string | null;
    diagnostico?: string | null;
    recursosBienConsumo?: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo[] | null;
    recursosServicio?: NotaVentaSalidaProduccionServicioReparacionRecursoServicio[] | null;
}

interface INotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo extends IModel {
    type;
    type;
    __NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo: 'NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo';
    salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion | null;
    numero?: number | null;
    fecha?: string | null;
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    cantidad?: number | null;
    importeCostoUnitario?: number | null;
    importeCostoNeto?: number | null;
    importeValorUnitario?: number | null;
    importeValorNeto?: number | null;
}

interface INotaVentaSalidaProduccionServicioReparacionRecursoServicio extends IModel {
    type;
    type;
    __NotaVentaSalidaProduccionServicioReparacionRecursoServicio: 'NotaVentaSalidaProduccionServicioReparacionRecursoServicio';
    salidaProduccion?: NotaVentaSalidaProduccionServicioReparacion | null;
    numero?: number | null;
    servicioReparacion?: ServicioReparacion | null;
    descripcion?: string | null;
    fechaInicio?: string | null;
    fechaFinal?: string | null;
    importeCostoNeto?: number | null;
    importeValorNeto?: number | null;
}

interface IDocumentoFuente extends IModel {
    type;
    type;
    __DocumentoFuente: 'DocumentoFuente';
    codigoSerie?: string | null;
    codigoNumero?: number | null;
    concepto?: string | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
    fechaEmision?: string | null;
    fechaAnulacion?: string | null;
    usuario?: Usuario | null;
    notas?: Nota[] | null;
    importeNeto?: number | null;
}

interface INota extends IModel {
    type;
    type;
    __Nota: 'Nota';
    numero?: number | null;
    fecha?: string | null;
    descripcion?: string | null;
    documentoFuente?: DocumentoFuente | null;
    usuario?: Usuario | null;
}

interface IDocumentoMovimiento extends IDocumentoFuente {
    type;
    type;
    __DocumentoMovimiento: 'DocumentoMovimiento';
    documentoTransaccion?: DocumentoTransaccion | null;
}

interface IDocumentoEntrada extends IDocumentoMovimiento {
    type;
    type;
    __DocumentoEntrada: 'DocumentoEntrada';
}

interface IDocumentoEntradaEfectivo extends IDocumentoEntrada {
    type;
    type;
    __DocumentoEntradaEfectivo: 'DocumentoEntradaEfectivo';
    entradas?: EntradaEfectivo[] | null;
}

interface IDocumentoEntradaBienConsumo extends IDocumentoEntrada {
    type;
    type;
    __DocumentoEntradaBienConsumo: 'DocumentoEntradaBienConsumo';
    entradas?: EntradaBienConsumo[] | null;
}

interface IDocumentoSalida extends IDocumentoMovimiento {
    type;
    type;
    __DocumentoSalida: 'DocumentoSalida';
}

interface IDocumentoSalidaEfectivo extends IDocumentoSalida {
    type;
    type;
    __DocumentoSalidaEfectivo: 'DocumentoSalidaEfectivo';
    salidas?: SalidaEfectivo[] | null;
}

interface IDocumentoSalidaBienConsumo extends IDocumentoSalida {
    type;
    type;
    __DocumentoSalidaBienConsumo: 'DocumentoSalidaBienConsumo';
    salidas?: SalidaBienConsumo[] | null;
    importeCostoNeto?: number | null;
}

interface IDocumentoSalidaProduccion extends IDocumentoSalida {
    type;
    type;
    __DocumentoSalidaProduccion: 'DocumentoSalidaProduccion';
    salidas?: SalidaProduccion[] | null;
    importeCostoNeto?: number | null;
}

interface IDocumentoTransaccion extends IDocumentoFuente {
    type;
    type;
    __DocumentoTransaccion: 'DocumentoTransaccion';
    docsEntradaEfectivo?: DocumentoEntradaEfectivo[] | null;
    docsEntradaBienConsumo?: DocumentoEntradaBienConsumo[] | null;
    docsSalidaEfectivo?: DocumentoSalidaEfectivo[] | null;
    docsSalidaBienConsumo?: DocumentoSalidaBienConsumo[] | null;
    importeValorEntradaEfectivo?: number | null;
    importeValorEntradaBienConsumo?: number | null;
    importeValorSalidaEfectivo?: number | null;
    importeCostoSalidaBienConsumo?: number | null;
    importeValorSalidaBienConsumo?: number | null;
    importeCostoSalidaProduccion?: number | null;
    importeValorSalidaProduccion?: number | null;
    importeBruto?: number | null;
}

interface ILiquidacionTipo extends IModel {
    type;
    type;
    __LiquidacionTipo: 'LiquidacionTipo';
    nombre?: string | null;
}

interface IDocumentoEgreso extends IDocumentoTransaccion {
    type;
    type;
    __DocumentoEgreso: 'DocumentoEgreso';
}

interface IDocumentoIngreso extends IDocumentoTransaccion {
    type;
    type;
    __DocumentoIngreso: 'DocumentoIngreso';
}

interface IComprobanteTipo extends IModel {
    type;
    type;
    __ComprobanteTipo: 'ComprobanteTipo';
    nombre?: string | null;
}

interface INotaEgreso extends IDocumentoTransaccion {
    type;
    type;
    __NotaEgreso: 'NotaEgreso';
    comprobanteTipo?: ComprobanteTipo | null;
    comprobanteCodigoSerie?: string | null;
    comprobanteCodigoNumero?: number | null;
    proveedor?: Persona | null;
    proveedorDocumentoIdentificacion?: DocumentoIdentificacion | null;
    proveedorCodigo?: string | null;
    proveedorNombre?: string | null;
    proveedorCelular?: number | null;
    liquidacion?: LiquidacionTipo | null;
    detalles?: NotaEgresoDetalle[] | null;
    credito?: NotaEgresoCredito | null;
    importeBruto?: number | null;
    importeDescuento?: number | null;
}

interface INotaEgresoDetalle extends IModel {
    type;
    type;
    __NotaEgresoDetalle: 'NotaEgresoDetalle';
    notaEgreso?: NotaEgreso | null;
    numero?: number | null;
    recurso?: Recurso | null;
    concepto?: string | null;
    cantidad?: number | null;
    importeUnitario?: number | null;
    importeBruto?: number | null;
    importeDescuento?: number | null;
    importeNeto?: number | null;
    comentario?: string | null;
}

interface INotaIngreso extends IDocumentoTransaccion {
    type;
    type;
    __NotaIngreso: 'NotaIngreso';
    cliente?: Persona | null;
    clienteDocumentoIdentificacion?: DocumentoIdentificacion | null;
    clienteCodigo?: string | null;
    clienteNombre?: string | null;
    clienteCelular?: number | null;
    liquidacion?: LiquidacionTipo | null;
    detalles?: NotaIngresoDetalle[] | null;
    credito?: NotaIngresoCredito | null;
    importeBruto?: number | null;
    importeDescuento?: number | null;
    importeNeto?: number | null;
}

interface INotaIngresoDetalle extends IModel {
    type;
    type;
    __NotaIngresoDetalle: 'NotaIngresoDetalle';
    notaIngreso?: NotaIngreso | null;
    numero?: number | null;
    recurso?: Recurso | null;
    concepto?: string | null;
    cantidad?: number | null;
    importeUnitario?: number | null;
    importeBruto?: number | null;
    importeDescuento?: number | null;
    importeNeto?: number | null;
    comentario?: string | null;
}

interface INotaVenta extends IDocumentoTransaccion {
    type;
    type;
    __NotaVenta: 'NotaVenta';
    fechaCompromiso?: string | null;
    cliente?: Persona | null;
    prioridad?: NotaVentaPrioridad | null;
    usuarioTecnico?: Usuario | null;
    estado?: NotaVentaEstado | null;
    salidasBienConsumo?: NotaVentaSalidaBienConsumo[] | null;
    salidasProduccionServicioReparacion?: NotaVentaSalidaProduccionServicioReparacion[] | null;
    entradasEfectivo?: NotaVentaEntradaEfectivo[] | null;
    importeBruto?: number | null;
    importeDescuento?: number | null;
    importeInicial?: number | null;
    importeAdicional?: number | null;
    importeNeto?: number | null;
}

interface INotaVentaPrioridad extends IModel {
    type;
    type;
    __NotaVentaPrioridad: 'NotaVentaPrioridad';
    nombre?: string | null;
}

interface INotaVentaEstado extends IModel {
    type;
    type;
    __NotaVentaEstado: 'NotaVentaEstado';
    numero?: number | null;
    nombre?: string | null;
    colorHexadecimal?: string | null;
}

interface IKardexLock extends IModel {
    type;
    type;
    __KardexLock: 'KardexLock';
    clave?: string | null;
    fecha?: string | null;
}

interface IInventarioBienConsumo extends IModel {
    type;
    type;
    __InventarioBienConsumo: 'InventarioBienConsumo';
    kardexs?: KardexBienConsumo[] | null;
}

interface IKardexBienConsumo extends IModel {
    type;
    type;
    __KardexBienConsumo: 'KardexBienConsumo';
    inventario?: InventarioBienConsumo | null;
    almacen?: Almacen | null;
    bienConsumo?: BienConsumo | null;
    eventosPendientes?: EventoPendienteKardexBienConsumo[] | null;
    errores?: ErrorKardexBienConsumo[] | null;
    movimientos?: KardexBienConsumoMovimiento[] | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
    entradaCantidadAcumulado?: number | null;
    entradaCostoAcumulado?: number | null;
    salidaCantidadAcumulado?: number | null;
    salidaCostoAcumulado?: number | null;
    saldoCantidad?: number | null;
    saldoValorUnitario?: number | null;
    saldoValorTotal?: number | null;
}

interface IKardexBienConsumoMovimiento extends IModel {
    type;
    type;
    __KardexBienConsumoMovimiento: 'KardexBienConsumoMovimiento';
    kardex?: KardexBienConsumo | null;
    numero?: number | null;
    referenciaUuid?: string | null;
    movimientoTipo?: string | null;
    fecha?: string | null;
    documentoFuenteCodigoSerie?: string | null;
    documentoFuenteCodigoNumero?: number | null;
    movimientoNumero?: number | null;
    concepto?: string | null;
    entradaCantidad?: number | null;
    entradaCostoUnitario?: number | null;
    entradaCostoTotal?: number | null;
    entradaCantidadAcumulado?: number | null;
    entradaCostoAcumulado?: number | null;
    salidaCantidad?: number | null;
    salidaCostoUnitario?: number | null;
    salidaCostoTotal?: number | null;
    salidaCantidadAcumulado?: number | null;
    salidaCostoAcumulado?: number | null;
    saldoCantidad?: number | null;
    saldoValorUnitario?: number | null;
    saldoValorTotal?: number | null;
}

interface IEventoPendienteKardexBienConsumo extends IModel {
    type;
    type;
    __EventoPendienteKardexBienConsumo: 'EventoPendienteKardexBienConsumo';
    kardex?: KardexBienConsumo | null;
    evento?: string | null;
    data?: Record<any, any> | null;
    fecha?: string | null;
}

interface IErrorKardexBienConsumo extends IModel {
    type;
    type;
    __ErrorKardexBienConsumo: 'ErrorKardexBienConsumo';
    kardex?: KardexBienConsumo | null;
    numero?: number | null;
    mensaje?: string | null;
    fecha?: string | null;
}

