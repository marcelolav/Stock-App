export interface Cliente {
    id?: string;
    nombre: string;
    direccion?: string;
    telefono?: string;
    cuit?: string;
    creditoActual?: number;
    creditoDisponible?: number;
}
