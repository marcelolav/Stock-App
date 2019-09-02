export interface Encabezado {
    fecha: string;
    nombreProveedor?: string;
    nombreCliente?: string;
    direccionCliente?: string;
    telefonoCliente?: string;
    cuitCliente?: string;
    creditoMaximoCliente?: number;
    creditoDisponibleCliente?: number;
    comprobante: string;
}
