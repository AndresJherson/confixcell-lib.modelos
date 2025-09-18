import { DateTime } from 'luxon';
import { IModel } from '../../index';

export interface IUsuario extends IModel {
    __Usuario: 'Usuario';
    correo?: string | null;
    contrasena?: string | null;
    nombre?: string | null;
    esActivo?: boolean | null;
    fechaCreacion?: string | null;
    fechaActualizacion?: string | null;
    get dateTimeCreacion(): DateTime;
    get dateTimeActualizacion(): DateTime;

    
}
