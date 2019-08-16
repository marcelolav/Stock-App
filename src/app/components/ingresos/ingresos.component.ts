import { Component, OnInit, TemplateRef, OnDestroy  } from '@angular/core';
// Interfaz de movimientos (Diseño del registro movimientos)
import { Movimientos } from 'src/app/interfaces/movimientos';
// Servicios a utilizar
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Modales
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ang-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit, OnDestroy {

  encabezado = {};
  detalle = {};
  itemsDetalle = [];
  items = false;
  regIngreso = {} as Movimientos;
  private unsubscribe = new Subject();
  proveedores = [];
  productos = [];
  movimientos = [];
  modalRef: BsModalRef;
  totalCantidad = 0;
  totalCompra = 0;

  constructor(
    private movSer: MovimientosService,
    private prdSer: ProductosService,
    private prvSer: ProveedoresService,
    private modalService: BsModalService
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
  }
  agregarItem(data) {
    this.items = true;
    this.itemsDetalle.push(data);
    this.totalCantidad = this.totalCantidad + data.cantidadIngreso;
    this.totalCompra = this.totalCompra + data.precioCompra;
    this.detalle = {};
    console.log(this.itemsDetalle);
  }
  borraElementoDetalle(i, tcant, timporte) {
    console.log(i)
    this.totalCantidad = this.totalCantidad - tcant;
    this.totalCompra = this.totalCompra - timporte;
    this.itemsDetalle.splice(i, 1);
  }
  ingresarStock(dato) {

    console.log(dato);
    this.items = false;
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.encabezado = {
      fecha: data.fecha,
      proveedor: data.nombreProveedor
    }
    this.modalRef = this.modalService.show(template);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
