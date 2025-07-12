import { ModelType } from '../../../index';

export enum DbPresetTarget {
    almacenDeBienConsumoDeNotaVenta = 'almacenDeBienConsumoDeNotaVenta',
    almacenDeRecursoBienConusmoDeServicioReparacionDeNotaVenta = 'almacenDeRecursoBienConusmoDeServicioReparacionDeNotaVenta',
    servicioReparacion = 'servicioReparacion',
    politicasDeNotaVenta = 'politicasDeNotaVenta'
}

export const DbPresetType = {
    Number: 'Number',
    String: 'String',
    Json: 'Json',
    ...ModelType
}