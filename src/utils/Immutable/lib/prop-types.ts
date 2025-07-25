export const PropTypes: Record<string, Record<string, string>> = {
    "Model": {
        "symbol": "Symbol",
        "id": "Number",
        "uuid": "String"
    },
    "DocumentoFuente": {
        "codigoSerie": "String",
        "codigoNumero": "Number",
        "concepto": "String",
        "fechaCreacion": "String",
        "fechaActualizacion": "String",
        "fechaEmision": "String",
        "fechaAnulacion": "String",
        "usuario": "Usuario",
        "notas": "Array<Nota>",
        "importeNeto": "Number"
    },
    "PoliticaComercial": {
        "descripcion": "String",
        "esActivo": "Boolean"
    },
    "KardexLock": {
        "clave": "String",
        "fecha": "String"
    },
    "Credito": {
        "importeValorNeto": "Number",
        "tasaInteresDiario": "Number",
        "importeInteres": "Number",
        "porcentajeInteres": "Number",
        "importeValorFinal": "Number",
        "cuotas": "Array<TCuota>"
    },
    "Cuota": {
        "credito": "ICredito<Cuota>",
        "numero": "Number",
        "fechaInicio": "String",
        "fechaVencimiento": "String",
        "duracionMinutos": "Number",
        "importeInteres": "Number",
        "importeAmortizacion": "Number",
        "importeCuota": "Number",
        "importeSaldo": "Number",
        "esActivoMora": "Boolean",
        "fechaLimiteMora": "String",
        "importeMora": "Number",
        "importeCobrado": "Number",
        "importePorCobrar": "Number",
        "porcentajeCobrado": "Number",
        "porcentajePorCobrar": "Number"
    },
    "MedioTransferencia": {
        "nombre": "String"
    },
    "MovimientoRecurso": {
        "documentoFuente": "DocumentoFuente",
        "importeValorNeto": "Number"
    },
    "DocumentoIdentificacion": {
        "nombre": "String"
    },
    "Genero": {
        "nombre": "String"
    },
    "Persona": {
        "subUsuario": "SubUsuario",
        "documentoIdentificacion": "DocumentoIdentificacion",
        "codigo": "String",
        "fechaCreacion": "String",
        "fechaActualizacion": "String"
    },
    "MetadataPresetRecord": {
        "value": "TValue",
        "descripcion": "String",
        "model": "TModel"
    },
    "PresetRecord": {
        "almacenDeBienesDeConsumoDeNotaVenta": "MetadataPresetRecord<String, Almacen>",
        "almacenDeRecursosBienDeConsumoDeNotaVenta": "MetadataPresetRecord<String, Almacen>",
        "servicioDeReparacionDeNotaVenta": "MetadataPresetRecord<String, Servicio>"
    },
    "Recurso": {
        "codigo": "String",
        "esActualizable": "Boolean",
        "esSalida": "Boolean",
        "fechaCreacion": "String",
        "fechaActualizacion": "String"
    },
    "Usuario": {
        "correo": "String",
        "contrasena": "String",
        "nombre": "String",
        "esActivo": "Boolean",
        "fechaCreacion": "String",
        "fechaActualizacion": "String"
    },
    "DocumentoMovimiento": {
        "documentoTransaccion": "DocumentoTransaccion"
    },
    "DocumentoTransaccion": {
        "docsEntradaEfectivo": "Array<DocumentoEntradaEfectivo>",
        "docsEntradaBienConsumo": "Array<DocumentoEntradaBienConsumo>",
        "docsSalidaEfectivo": "Array<DocumentoSalidaEfectivo>",
        "docsSalidaBienConsumo": "Array<DocumentoSalidaBienConsumo>",
        "importeValorEntradaEfectivo": "Number",
        "importeValorEntradaBienConsumo": "Number",
        "importeValorSalidaEfectivo": "Number",
        "importeCostoSalidaBienConsumo": "Number",
        "importeValorSalidaBienConsumo": "Number",
        "importeCostoSalidaProduccion": "Number",
        "importeValorSalidaProduccion": "Number",
        "importeBruto": "Number"
    },
    "LiquidacionTipo": {
        "nombre": "String"
    },
    "Nota": {
        "fecha": "String",
        "descripcion": "String",
        "documentoFuente": "DocumentoFuente",
        "usuario": "Usuario"
    },
    "ErrorKardexBienConsumo": {
        "kardex": "KardexBienConsumo",
        "mensaje": "String",
        "fecha": "String"
    },
    "EventoPendienteKardexBienConsumo": {
        "kardex": "KardexBienConsumo",
        "evento": "String",
        "data": "__type",
        "fecha": "String"
    },
    "InventarioBienConsumo": {
        "kardexs": "Array<KardexBienConsumo>"
    },
    "KardexBienConsumo": {
        "inventario": "InventarioBienConsumo",
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "eventosPendientes": "Array<EventoPendienteKardexBienConsumo>",
        "errores": "Array<ErrorKardexBienConsumo>",
        "movimientos": "Array<KardexMovimientoBienConsumo>",
        "fechaCreacion": "String",
        "fechaActualizacion": "String",
        "entradaCantidadAcumulado": "Number",
        "entradaCostoAcumulado": "Number",
        "salidaCantidadAcumulado": "Number",
        "salidaCostoAcumulado": "Number",
        "saldoCantidad": "Number",
        "saldoValorUnitario": "Number",
        "saldoValorTotal": "Number"
    },
    "KardexMovimientoBienConsumo": {
        "kardex": "KardexBienConsumo",
        "referenciaUuid": "String",
        "movimientoTipo": "String",
        "fecha": "String",
        "documentoFuenteCodigoSerie": "String",
        "documentoFuenteCodigoNumero": "Number",
        "concepto": "String",
        "entradaCantidad": "Number",
        "entradaCostoUnitario": "Number",
        "entradaCostoTotal": "Number",
        "entradaCantidadAcumulado": "Number",
        "entradaCostoAcumulado": "Number",
        "salidaCantidad": "Number",
        "salidaCostoUnitario": "Number",
        "salidaCostoTotal": "Number",
        "salidaCantidadAcumulado": "Number",
        "salidaCostoAcumulado": "Number",
        "saldoCantidad": "Number",
        "saldoValorUnitario": "Number",
        "saldoValorTotal": "Number"
    },
    "EntradaRecurso": {
        "importeValorNeto": "Number"
    },
    "SalidaRecurso": {
        "importeValorNeto": "Number"
    },
    "PersonaJuridica": {
        "nombre": "String",
        "domicilio": "String",
        "celular": "Number"
    },
    "PersonaNatural": {
        "nombre": "String",
        "apellido": "String",
        "genero": "Genero",
        "domicilio": "String",
        "celular": "Number",
        "celularRespaldo": "Number"
    },
    "Bien": {
        "precioUnitario": "Number"
    },
    "Permiso": {
        "nombre": "String",
        "descripcion": "String",
        "rol": "Rol"
    },
    "Rol": {
        "nombre": "String",
        "descripcion": "String",
        "permisos": "Array<Permiso>",
        "subUsuario": "SubUsuario"
    },
    "SubUsuario": {
        "persona": "Persona",
        "creadoPor": "Usuario",
        "superUsuario": "SuperUsuario",
        "roles": "Array<Rol>"
    },
    "Preset": {
        "json": "__type",
        "superUsuario": "SuperUsuario"
    },
    "SuperUsuario": {
        "empresa": "SuperUsuarioEmpresa",
        "preset": "Preset",
        "subUsuarios": "Array<SubUsuario>"
    },
    "SuperUsuarioEmpresa": {
        "razonSocial": "String",
        "ruc": "String",
        "celular": "Number",
        "domicilio": "String",
        "superUsuario": "SuperUsuario"
    },
    "DocumentoEntradaBienConsumo": {
        "entradas": "Array<EntradaBienConsumo>"
    },
    "DocumentoEntradaEfectivo": {
        "entradas": "Array<EntradaEfectivo>"
    },
    "DocumentoSalidaBienConsumo": {
        "salidas": "Array<SalidaBienConsumo>",
        "importeCostoNeto": "Number"
    },
    "DocumentoSalidaEfectivo": {
        "salidas": "Array<SalidaEfectivo>"
    },
    "DocumentoSalidaProduccion": {
        "salidas": "Array<SalidaProduccion>",
        "importeCostoNeto": "Number"
    },
    "EntradaBienConsumo": {
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "cantidadEntrante": "Number",
        "importeValorUnitario": "Number",
        "importeValorNeto": "Number",
        "cantidadSaliente": "Number"
    },
    "EntradaBienConsumoValorSalida": {
        "salida": "SalidaBienConsumo"
    },
    "EntradaEfectivoContado": {
        "medioTransferencia": "MedioTransferencia"
    },
    "EntradaEfectivoCredito": {
        "importeValorNeto": "Number",
        "tasaInteresDiario": "Number",
        "importeInteres": "Number",
        "porcentajeInteres": "Number",
        "importeValorFinal": "Number",
        "cuotas": "Array<EntradaEfectivoCuota>"
    },
    "EntradaEfectivoCuota": {
        "credito": "EntradaEfectivoCredito"
    },
    "NotaEgresoCredito": {
        "documentoFuente": "NotaEgreso",
        "importeValorNeto": "Number",
        "tasaInteresDiario": "Number",
        "importeInteres": "Number",
        "porcentajeInteres": "Number",
        "importeValorFinal": "Number",
        "cuotas": "Array<NotaEgresoCuota>"
    },
    "NotaEgresoCuota": {
        "credito": "NotaEgresoCredito"
    },
    "NotaVentaEntradaEfectivo": {
        "documentoFuente": "NotaVenta",
        "numero": "Number",
        "medioTransferencia": "MedioTransferencia",
        "fecha": "String"
    },
    "NotaVentaSalidaBienConsumo": {
        "documentoFuente": "NotaVenta",
        "cantidadSaliente": "Number",
        "importeValorUnitario": "Number",
        "importeValorBruto": "Number",
        "importeValorDescuento": "Number",
        "importeValorNeto": "Number"
    },
    "SalidaBienConsumo": {
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "cantidadSaliente": "Number",
        "cantidadEntrante": "Number",
        "importeCostoUnitario": "Number",
        "importeCostoNeto": "Number",
        "importeValorUnitario": "Number",
        "importeValorNeto": "Number"
    },
    "SalidaBienConsumoValorEntrada": {
        "entrada": "EntradaBienConsumo"
    },
    "NotaIngresoCredito": {
        "documentoFuente": "NotaIngreso",
        "importeValorNeto": "Number",
        "tasaInteresDiario": "Number",
        "importeInteres": "Number",
        "porcentajeInteres": "Number",
        "importeValorFinal": "Number",
        "cuotas": "Array<NotaIngresoCuota>"
    },
    "NotaIngresoCuota": {
        "credito": "NotaIngresoCredito"
    },
    "SalidaEfectivoContado": {
        "medioTransferencia": "MedioTransferencia"
    },
    "SalidaEfectivoCredito": {
        "importeValorNeto": "Number",
        "tasaInteresDiario": "Number",
        "importeInteres": "Number",
        "porcentajeInteres": "Number",
        "importeValorFinal": "Number",
        "cuotas": "Array<SalidaEfectivoCuota>"
    },
    "SalidaEfectivoCuota": {
        "credito": "SalidaEfectivoCredito"
    },
    "SalidaProduccion": {
        "importeCostoNeto": "Number",
        "importeValorNeto": "Number"
    },
    "Almacen": {
        "nombre": "String",
        "bienCapital": "BienCapital"
    },
    "BienCapital": {
        "bienConsumo": "BienConsumo",
        "numero": "Number",
        "descripcion": "String"
    },
    "ServicioEstandar": {
        "nombre": "String",
        "categoria": "ServicioEstandarCategoria",
        "precioUnitario": "Number"
    },
    "ServicioEstandarCategoria": {
        "nombre": "String"
    },
    "ServicioReparacion": {
        "nombre": "String",
        "esSalida": "Boolean"
    },
    "ComprobanteTipo": {
        "nombre": "String"
    },
    "NotaEgreso": {
        "comprobanteTipo": "ComprobanteTipo",
        "comprobanteCodigoSerie": "String",
        "comprobanteCodigoNumero": "Number",
        "proveedor": "Persona",
        "proveedorDocumentoIdentificacion": "DocumentoIdentificacion",
        "proveedorCodigo": "String",
        "proveedorNombre": "String",
        "proveedorCelular": "Number",
        "liquidacion": "LiquidacionTipo",
        "detalles": "Array<NotaEgresoDetalle>",
        "credito": "NotaEgresoCredito",
        "importeBruto": "Number",
        "importeDescuento": "Number"
    },
    "NotaEgresoDetalle": {
        "notaEgreso": "NotaEgreso",
        "recurso": "Recurso",
        "concepto": "String",
        "cantidad": "Number",
        "importeUnitario": "Number",
        "importeBruto": "Number",
        "importeDescuento": "Number",
        "importeNeto": "Number",
        "comentario": "String"
    },
    "NotaIngreso": {
        "cliente": "Persona",
        "clienteDocumentoIdentificacion": "DocumentoIdentificacion",
        "clienteCodigo": "String",
        "clienteNombre": "String",
        "clienteCelular": "Number",
        "liquidacion": "LiquidacionTipo",
        "detalles": "Array<NotaIngresoDetalle>",
        "credito": "NotaIngresoCredito",
        "importeBruto": "Number",
        "importeDescuento": "Number",
        "importeNeto": "Number"
    },
    "NotaIngresoDetalle": {
        "notaIngreso": "NotaIngreso",
        "recurso": "Recurso",
        "concepto": "String",
        "cantidad": "Number",
        "importeUnitario": "Number",
        "importeBruto": "Number",
        "importeDescuento": "Number",
        "importeNeto": "Number",
        "comentario": "String"
    },
    "NotaVenta": {
        "fechaCompromiso": "String",
        "cliente": "Persona",
        "prioridad": "NotaVentaPrioridad",
        "usuarioTecnico": "Usuario",
        "estado": "NotaVentaEstado",
        "salidasBienConsumo": "Array<NotaVentaSalidaBienConsumo>",
        "salidasProduccionServicioReparacion": "Array<NotaVentaSalidaProduccionServicioReparacion>",
        "entradasEfectivo": "Array<NotaVentaEntradaEfectivo>",
        "importeBruto": "Number",
        "importeDescuento": "Number",
        "importeInicial": "Number",
        "importeAdicional": "Number",
        "importeNeto": "Number"
    },
    "NotaVentaEstado": {
        "orden": "Number",
        "nombre": "String",
        "colorHexadecimal": "String"
    },
    "NotaVentaPrioridad": {
        "nombre": "String"
    },
    "SalidaProduccionBien": {
        "bienConsumo": "BienConsumo",
        "cantidadSaliente": "Number",
        "cantidadEntrante": "Number",
        "importeCostoUnitario": "Number",
        "importeValorUnitario": "Number"
    },
    "SalidaProduccionServicio": {
        "servicio": "Servicio"
    },
    "Calidad": {
        "nombre": "String"
    },
    "PantallaMarca": {
        "nombre": "String"
    },
    "PantallaModelo": {
        "nombre": "String",
        "marca": "PantallaMarca"
    },
    "PantallaModeloCalidad": {
        "modelo": "PantallaModelo",
        "calidad": "Calidad",
        "esSalida": "Boolean"
    },
    "Magnitud": {
        "nombre": "String"
    },
    "Producto": {
        "nombre": "String",
        "marca": "ProductoMarca",
        "magnitud": "Magnitud",
        "categoria": "ProductoCategoria"
    },
    "ProductoCategoria": {
        "nombre": "String"
    },
    "ProductoMarca": {
        "nombre": "String"
    },
    "SalidaProduccionBienActividad": {
        "salidaProduccionBienStandar": "SalidaProduccionBienStandar",
        "nombre": "String",
        "fechaInicio": "String",
        "fechaFinal": "String",
        "recursosBienConsumo": "Array<SalidaProduccionBienRecursoBienConsumo>",
        "recursosBienCapital": "Array<SalidaProduccionBienRecursoBienCapital>",
        "recursosServicio": "Array<SalidaProduccionBienRecursoServicio>",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionBienRecursoBienCapital": {
        "actividad": "SalidaProduccionBienActividad",
        "bienCapital": "BienCapital",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionBienRecursoBienConsumo": {
        "actividad": "SalidaProduccionBienActividad",
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "cantidad": "Number",
        "importeCostoUnitario": "Number",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionBienRecursoServicio": {
        "actividad": "SalidaProduccionBienActividad",
        "servicio": "Servicio",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionBienStandar": {
        "actividades": "Array<SalidaProduccionBienActividad>"
    },
    "NotaVentaSalidaProduccionServicioReparacion": {
        "documentoFuente": "NotaVenta",
        "servicio": "Servicio",
        "pantallaModelo": "PantallaModelo",
        "imei": "String",
        "patron": "Number",
        "contrasena": "String",
        "diagnostico": "String",
        "recursosBienConsumo": "Array<NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo>",
        "recursosServicio": "Array<NotaVentaSalidaProduccionServicioReparacionRecursoServicio>"
    },
    "NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo": {
        "salidaProduccion": "NotaVentaSalidaProduccionServicioReparacion",
        "fecha": "String",
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "cantidad": "Number",
        "importeCostoUnitario": "Number",
        "importeCostoNeto": "Number",
        "importeValorUnitario": "Number",
        "importeValorNeto": "Number"
    },
    "NotaVentaSalidaProduccionServicioReparacionRecursoServicio": {
        "salidaProduccion": "NotaVentaSalidaProduccionServicioReparacion",
        "servicioReparacion": "ServicioReparacion",
        "descripcion": "String",
        "fechaInicio": "String",
        "fechaFinal": "String",
        "importeCostoNeto": "Number",
        "importeValorNeto": "Number"
    },
    "SalidaProduccionServicioActividad": {
        "salidaProduccionServicioStandar": "SalidaProduccionServicioStandar",
        "nombre": "String",
        "fechaInicio": "String",
        "fechaFinal": "String",
        "recursosBienConsumo": "Array<SalidaProduccionServicioRecursoBienConsumo>",
        "recursosBienCapital": "Array<SalidaProduccionServicioRecursoBienCapital>",
        "recursosServicio": "Array<SalidaProduccionServicioRecursoServicio>",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionServicioRecursoBienCapital": {
        "actividad": "SalidaProduccionServicioActividad",
        "bienCapital": "BienCapital",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionServicioRecursoBienConsumo": {
        "actividad": "SalidaProduccionServicioActividad",
        "almacen": "Almacen",
        "bienConsumo": "BienConsumo",
        "cantidad": "Number",
        "importeCostoUnitario": "Number",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionServicioRecursoServicio": {
        "actividad": "SalidaProduccionServicioActividad",
        "servicio": "Servicio",
        "importeCostoNeto": "Number"
    },
    "SalidaProduccionServicioStandar": {
        "actividades": "Array<SalidaProduccionServicioActividad>"
    }
} as const;
