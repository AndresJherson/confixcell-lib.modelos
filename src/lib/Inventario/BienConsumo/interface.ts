import { Almacen, BienConsumo, MovimientoTipoBienConsumo } from '../../../index';

interface RecordKardexBienConsumo
{
    [x:string]: KardexBienConsumo
}

interface KardexBienConsumo
{
    almacen: Almacen;
    bienConsumo: BienConsumo;
    movimientos: KardexMovimientoBienConsumo[];
}

interface KardexMovimientoBienConsumo
{
    movimientoUuid: string;
    movimientoRefUuid: string;
    movimientoTipo: MovimientoTipoBienConsumo;

    fecha: string;
    documentoFuenteCodigoSerie: string;
    documentoFuenteCodigoNumero: number;
    concepto?: string;
    
    entradaCantidad?: number;
    entradaCostoUnitario?: number;
    entradaCostoTotal?: number;
    
    salidaCantidad?: number;
    salidaCostoUnitario?: number;
    salidaCostoTotal?: number;
}