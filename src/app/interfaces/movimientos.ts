export interface Movimientos {
    id?: string;
    fecha: string;
    comprobante: string;
    tipoMovimiento: string;
    idProducto: string;
    nombreProducto: string;
    nombreProveedor: string;
    nombreCliente: string;
    cantidadIngreso: number;
    cantidadEgreso: number;
    precioUnitario: number;
    precioCompra: number;
    precioVenta: number;
    notas?: string;
}
