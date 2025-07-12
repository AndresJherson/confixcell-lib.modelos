import { ModelType } from "../../../index";

export enum MovimientoTipoBienConsumo {
    ENTRADA_VALOR_NUEVO = ModelType.EntradaBienConsumoValorNuevo,
    ENTRADA_VALOR_SALIDA = ModelType.EntradaBienConsumoValorSalida,
    SALIDA_VALOR_NUEVO = ModelType.SalidaBienConsumoValorNuevo,
    SALIDA_VALOR_ENTRADA = ModelType.SalidaBienConsumoValorEntrada,
    SALIDA_NOTA_VENTA = ModelType.NotaVentaSalidaBienConsumo,
    SALIDA_NOTA_VENTA_SERVICIO_REPARACION_RECURSO = ModelType.NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo
}