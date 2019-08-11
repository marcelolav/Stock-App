export interface Producto {
    id?: string;
    nombreProducto: string;
    nombreRubro: string;
    existencia: number;
    precioCompra: number;
    precioVenta: number;
    esOferta: boolean;
    urlImagen?: string;
}
