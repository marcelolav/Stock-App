import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { formatDate } from '@angular/common';
// Interfaz de movimientos (Diseño del registro movimientos)
import { Movimientos } from 'src/app/interfaces/movimientos';
// Servicios a utilizar
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ang-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit, OnDestroy {

  regIngreso = {} as Movimientos;
  private unsubscribe = new Subject();
  proveedores = [];
  productos = [];
  movimientos = [];

  fechaIngreso = formatDate(new Date(), 'dd/MM/yyyy', 'en-US').toString();

  constructor(
    private movSer: MovimientosService,
    private prdSer: ProductosService,
    private prvSer: ProveedoresService
  ) { }

  ngOnInit() {
    this.prdSer.getProductos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.productos = res; });
    this.prvSer.getProveedores()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.proveedores = res; });
    this.movSer.getMovimientos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.movimientos = res; });
    // this.regIngreso = {
    //   fecha: new Date().toDateString(),
    //   tipoMovimiento: 'EG-Venta',
    //   nombreProducto: 'Testing Salida Venta Producto',
    //   nombreProveedor: 'Testing Salida Venta Proveedor',
    //   nombreCliente: '',
    //   cantidadIngreso: 0,
    //   cantidadEgreso: 5,
    //   precioCompra: 11.50,
    //   precioVenta: 22.36
    // }
  }
  addIngreso(movimiento: Movimientos) {
    console.log(movimiento);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
