export interface Movimientos {
    id?: string;
    fecha: string;
    tipoMovimiento: string;
    nombreProducto: string;
    nombreProveedor: string;
    nombreCliente: string;
    cantidadIngreso: number;
    cantidadEgreso: number;
    precioCompra: number;
    precioVenta: number;
    notas: string;
}
