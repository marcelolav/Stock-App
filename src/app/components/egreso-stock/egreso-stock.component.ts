import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
// Interfaces a usar
import { Movimientos } from 'src/app/interfaces/movimientos';
import { Encabezado } from 'src/app/interfaces/encabezado';
import { Detalle } from 'src/app/interfaces/detalle';
// Servicios a usar
import { MovimientosService } from 'src/app/services/movimientos.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { ClientesService } from 'src/app/services/clientes.service';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Modales
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ang-egreso-stock',
  templateUrl: './egreso-stock.component.html',
  styleUrls: ['./egreso-stock.component.css']
})
export class EgresoStockComponent implements OnInit, OnDestroy {

  private unsubscribe = new Subject();
  encabezado = {} as Encabezado;
  detalle = {} as Detalle;
  regSalida = {} as Movimientos;

  productos = [];
  proveedores = [];
  clientes = [];
  movimientos = [];

  modalRef: BsModalRef;

  items = false;   // items es verdadera cuando hay algun item dentro de detalle para desplegar.

  constructor(
    private movServ: MovimientosService,
    private prodServ: ProductosService,
    private prvServ: ProveedoresService,
    private cliServ: ClientesService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.movServ.getMovimientos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.movimientos = res; });
    this.prodServ.getProductos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.productos = res; });
    this.prvServ.getProveedores()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.proveedores = res; });
    this.cliServ.getClientes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.clientes = res; });
  }
  // Abre el modal con los datos
  openModal(template: TemplateRef<any>, data: any) {
    this.encabezado = {
      fecha: data.fecha,
      nombreProveedor: data.nombreProveedor,
      nombreCliente: data.nombreCliente,
      comprobante: data.comprobante
    };
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  agregarItem(encabezado, detalle) {
    console.log(encabezado);
    if (Object.keys(encabezado).length < 4) {
      console.log('Debe completar encabezado de movimiento!');
    } else { 
      if (Object.keys(detalle).length < 2) {
        console.log('debe completar el ingreso de detalle!');
      } else {
        console.log('Completo todos los datos correctamente!!!');
        console.log('Id Producto:', detalle.infoProducto.split(',')[0]);
        console.log('Nombre:', detalle.infoProducto.split(',')[1]);
        console.log('Existencia:', +detalle.infoProducto.split(',')[2]);
        console.log('Salida:', detalle.cantidadEgreso);
        const cantidadNueva = +detalle.infoProducto.split(',')[2] - detalle.cantidadEgreso;
        if (cantidadNueva < 0) {
          console.log('No se puede sacar No hay stock suficiente!');
        } else {
          console.log('Cantidad Nueva: ', cantidadNueva);
        }
      }
    }
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
