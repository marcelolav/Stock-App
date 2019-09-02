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
  detalleItem = {} as Detalle;
  regSalida = {} as Movimientos;

  detalleArray = [];

  totalCantidad = 0;

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
  openModal(template: TemplateRef<any>, encabezado: any, detalle: any) {
    this.encabezado = {
      fecha: encabezado.fecha,
      comprobante: encabezado.comprobante
    };
    this.detalle = {
      nombreProducto: detalle.nombreProducto,
      precioUnitario: 0,
      precioCompra: 0,
      precioVenta: 0,
      cantidadEgreso: detalle.cantidadEgreso
    }
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }

  agregarItem(encabezado, detalle) {
    if (encabezado.comprobante === null || encabezado.comprobante === undefined) {
      console.log('Debe completar encabezado de movimiento!');
    } else { 
      if (Object.keys(detalle).length < 2) {
        console.log('debe completar el ingreso de detalle!');
      } else {
        const cantidadNueva = +detalle.infoProducto.split(',')[2] - detalle.cantidadEgreso;
        if (cantidadNueva < 0) {
          console.log('No se puede sacar No hay stock suficiente!');
        } else {
          this.totalCantidad = this.totalCantidad + detalle.cantidadEgreso;
          this.detalleItem = {
            idProducto: detalle.infoProducto.split(',')[0],
            nombreProducto: detalle.infoProducto.split(',')[1],
            existenciaProducto: +detalle.infoProducto.split(',')[2],
            cantidadEgreso: detalle.cantidadEgreso,
            precioUnitario: 0,
            precioCompra: 0,
            precioVenta: 0
          };
          this.detalleArray.push(this.detalleItem);
          if (this.detalleArray.length > 0) {
            this.items = true;
          } else {
            this.items = false;
          }
        }
      }
    }
  }
  borraElementoDetalle(item, cantidad) {
    this.totalCantidad = this.totalCantidad - cantidad;
    this.detalleArray.splice(item, 1);
    if (this.detalleArray.length > 0) {
      this.items = true;
    } else {
      this.items = false;
    }
  }
  confirmaSalidaDefinitiva(enca, items) {
    console.log('Registro Items:', items);
    items.forEach(item => {
      this.regSalida = {
        fecha: enca.fecha,
        comprobante: enca.comprobante,
        tipoMovimiento: 'EG-Stock',
        idProducto: item.idProducto,
        nombreProducto: item.nombreProducto,
        nombreProveedor: 'N/A ',
        nombreCliente: 'Salida por Stock',
        cantidadEgreso: item.cantidadEgreso,
        cantidadIngreso: 0,
        precioUnitario: 0,
        precioCompra: 0,
        precioVenta: 0
      };
      console.log('Registro Salida:', this.regSalida);
      console.log('Stock Anterior: ', item.existenciaProducto);
      console.log('Salida: ', this.regSalida.cantidadEgreso);
      console.log('Stock Final: ', item.existenciaProducto - this.regSalida.cantidadEgreso);
      // Agrego el registro de movimiento
      this.movServ.addMovimiento(this.regSalida);
      // Actualizo el stock del producto
      const nuevostock = item.existenciaProducto - this.regSalida.cantidadEgreso
      this.prodServ.updateExistencia(item.idProducto, nuevostock);
    });
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
