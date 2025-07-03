import { ModelType } from '../../../index';

export enum PresetTarget {
    almacenDeBienConsumoDeNotaVenta = 'almacenDeBienConsumoDeNotaVenta',
    almacenDeRecursoBienConusmoDeServicioReparacionDeNotaVenta = 'almacenDeRecursoBienConusmoDeServicioReparacionDeNotaVenta',
    servicioReparacion = 'servicioReparacion',
    politicasDeNotaVenta = 'politicasDeNotaVenta'
}

export const PresetType = {
    Number: 'Number',
    String: 'String',
    Json: 'Json',
    ...ModelType
}