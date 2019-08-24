export interface Cliente {
    id?: string;
    nombreCliente: string;
    direccion?: string;
    telefono?: string;
    cuit?: string;
    creditoActual?: number;
    creditoDisponible?: number;
}
