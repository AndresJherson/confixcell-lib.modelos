import { EntradaBienConsumoValorNuevo, EntradaBienConsumoValorSalida, NotaVentaSalidaBienConsumo, NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo, SalidaBienConsumoValorEntrada, SalidaBienConsumoValorNuevo } from "../../../index";

export const MovimientoTipoBienConsumo = {
    ENTRADA_VALOR_NUEVO: EntradaBienConsumoValorNuevo.type,
    ENTRADA_VALOR_SALIDA: EntradaBienConsumoValorSalida.type,
    SALIDA_VALOR_NUEVO: SalidaBienConsumoValorNuevo.type,
    SALIDA_VALOR_ENTRADA: SalidaBienConsumoValorEntrada.type,
    SALIDA_NOTA_VENTA: NotaVentaSalidaBienConsumo.type,
    SALIDA_NOTA_VENTA_SERVICIO_REPARACION_RECURSO: NotaVentaSalidaProduccionServicioReparacionRecursoBienConsumo.type
}