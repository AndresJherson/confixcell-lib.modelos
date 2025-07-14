export enum ModelType {
    
    Model = 'Model',


    // Usuarios
    Usuario = 'Usuario',
    SuperUsuario = 'SuperUsuario',
    SuperUsuarioEmpresa = 'SuperUsuarioEmpresa',
    SubUsuario = 'SubUsuario',
    Rol = 'Rol',
    Permiso = 'Permiso',


    // Personas
    Persona = 'Persona',
    PersonaNatural = 'PersonaNatural',
    PersonaJuridica = 'PersonaJuridica',
    DocumentoIdentificacion = 'DocumentoIdentificacion',
    Genero = 'Genero',


    // Recursos
    Recurso = 'Recurso',

    Servicio = 'Servicio',
    ServicioEstandar = 'ServicioEstandar',
    ServicioEstandarCategoria = 'ServicioEstandarCategoria',
    ServicioReparacion = 'ServicioReparacion',

    Bien = 'Bien',
    BienConsumo = 'BienConsumo',
    PantallaModeloCalidad = 'PantallaModeloCalidad',
    PantallaModelo = 'PantallaModelo',
    PantallaMarca = 'PantallaMarca',
    Calidad = 'Calidad',
    Producto = 'Producto',
    ProductoMarca = 'ProductoMarca',
    ProductoCategoria = 'ProductoCategoria',
    Magnitud = 'Magnitud',

    BienCapital = 'BienCapital',
    Almacen = 'Almacen',


    // Movimientos Recursos
    MovimientoRecurso = 'MovimientoRecurso',
    MedioTransferencia = 'MedioTransferencia',
    Credito = 'Credito',
    Cuota = 'Cuota',

    EntradaRecurso = 'EntradaRecurso',
    
    EntradaEfectivo = 'EntradaEfectivo',
    EntradaEfectivoContado = 'EntradaEfectivoContado',
    EntradaEfectivoCredito = 'EntradaEfectivoCredito',
    EntradaEfectivoCuota = 'EntradaEfectivoCuota',
    NotaEgresoCredito = 'NotaEgresoCredito',
    NotaEgresoCuota = 'NotaEgresoCuota',
    NotaVentaEntradaEfectivo = 'NotaVentaEntradaEfectivo',

    EntradaBienConsumo = 'EntradaBienConsumo',
    EntradaBienConsumoValorNuevo = 'EntradaBienConsumoValorNuevo',
    EntradaBienConsumoValorSalida = 'EntradaBienConsumoValorSalida',

    SalidaRecurso = 'SalidaRecurso',

    SalidaEfectivo = 'SalidaEfectivo',
    SalidaEfectivoContado = 'SalidaEfectivoContado',
    SalidaEfectivoCredito = 'SalidaEfectivoCredito',
    SalidaEfectivoCuota = 'SalidaEfectivoCuota',
    NotaIngresoCredito = 'NotaIngresoCredito',
    NotaIngresoCuota = 'NotaIngresoCuota',

    SalidaBienConsumo = 'SalidaBienConsumo',
    SalidaBienConsumoValorNuevo = 'SalidaBienConsumoValorNuevo',
    SalidaBienConsumoValorEntrada = 'SalidaBienConsumoValorEntrada',
    NotaVentaSalidaBienConsumo = 'NotaVentaSalidaBienConsumo',

    SalidaProduccion = 'SalidaProduccion',
    SalidaProduccionBien = 'SalidaProduccionBien',
    SalidaProduccionServicio = 'SalidaProduccionServicio',

    SalidaProduccionBienStandar = 'SalidaProduccionBienStandar',
    SalidaProduccionBienActividad = 'SalidaProduccionBienActividad',
    SalidaProduccionBienRecursoBienConsumo = 'SalidaProduccionBienRecursoBienConsumo',
    SalidaProduccionBienRecursoBienCapital = 'SalidaProduccionBienRecursoBienCapital',
    SalidaProduccionBienRecursoServicio = 'SalidaProduccionBienRecursoServicio',

    SalidaProduccionServicioStandar = 'SalidaProduccionServicioStandar',
    SalidaProduccionServicioActividad = 'SalidaProduccionServicioActividad',
    SalidaProduccionServicioRecursoBienConsumo = 'SalidaProduccionServicioRecursoBienConsumo',
    SalidaProduccionServicioRecursoBienCapital = 'SalidaProduccionServicioRecursoBienCapital',
    SalidaProduccionServicioRecursoServicio = 'SalidaProduccionServicioRecursoServicio',

    NotaVentaSalidaProduccionServicioReparacion = 'NotaVentaSalidaProduccionServicioReparacion',
    NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo = 'NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo',
    NotaVentaSalidaProduccionServicioReparacionRecursoServicio = 'NotaVentaSalidaProduccionServicioReparacionRecursoServicio',


    // Documentos Fuente
    DocumentoFuente = 'DocumentoFuente',
    Nota = 'Nota',
    PoliticaComercial = 'PoliticaComercial',

    DocumentoMovimiento = 'DocumentoMovimiento',
    DocumentoEntrada = 'DocumentoEntrada',
    DocumentoSalida = 'DocumentoSalida',
    DocumentoEntradaEfectivo = 'DocumentoEntradaEfectivo',
    DocumentoEntradaBienConsumo = 'DocumentoEntradaBienConsumo',
    DocumentoEntradaBienCapital = 'DocumentoEntradaBienCapital',
    DocumentoEntradaServicio = 'DocumentoEntradaServicio',
    DocumentoSalidaEfectivo = 'DocumentoSalidaEfectivo',
    DocumentoSalidaBienConsumo = 'DocumentoSalidaBienConsumo',
    DocumentoSalidaBienCapital = 'DocumentoSalidaBienCapital',
    DocumentoSalidaServicio = 'DocumentoSalidaServicio',
    DocumentoSalidaProduccion = 'DocumentoSalidaProduccion',

    DocumentoTransaccion = 'DocumentoTransaccion',
    LiquidacionTipo = 'LiquidacionTipo',

    DocumentoEgreso = 'DocumentoEgreso',
    NotaEgreso = 'NotaEgreso',
    NotaEgresoDetalle = 'NotaEgresoDetalle',
    ComprobanteTipo = 'ComprobanteTipo',

    DocumentoIngreso = 'DocumentoIngreso',
    NotaIngreso = 'NotaIngreso',
    NotaIngresoDetalle = 'NotaIngresoDetalle',
    NotaVenta = 'NotaVenta',
    NotaVentaPrioridad = 'NotaVentaPrioridad',
    NotaVentaEstado = 'NotaVentaEstado',


    // Inventarios
    KardexLock = 'KardexLock',
    
    InventarioBienConsumo = 'InventarioBienConsumo',
    KardexBienConsumo = 'KardexBienConsumo',
    KardexMovimientoBienConsumo = 'KardexMovimientoBienConsumo',
    EventoPendienteKardexBienConsumo = 'EventoPendienteKardexBienConsumo',
    ErrorKardexBienConsumo = 'ErrorKardexBienConsumo',


    // Preset
    DbPreset = 'DbPreset'
}