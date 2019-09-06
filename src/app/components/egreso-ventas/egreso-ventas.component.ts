import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
// RXJS
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
// Servicios
import { ProductosService } from '../../services/productos.service';
import { ClientesService } from '../../services/clientes.service';
// Interfaces de datos (Interna y de fb)
import { Encabezado } from 'src/app/interfaces/encabezado';
import { Detalle } from 'src/app/interfaces/detalle';
import { Movimientos } from 'src/app/interfaces/movimientos';
// Modales
import { BsModalService, BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'ang-egreso-ventas',
  templateUrl: './egreso-ventas.component.html',
  styleUrls: ['./egreso-ventas.component.css']
})
export class EgresoVentasComponent implements OnInit, OnDestroy {

  productos = []; // Array de productos con todos los productos para el select productos
  clientes = []; // Array de clientes con todos los clientes para el select clientes

  encabezado = {} as Encabezado; // Interface Interna
  detalle = {} as Detalle; // interface interna
  detalleItem = {} as Detalle; // interface interna
  detalleArray = [];

  regSalida = {} as Movimientos;  // interface de firestore

  items = false;

  cantidadExistencia = 0;
  cantidadLinea = 0;
  precioVentaProvisorio = 0;
  precioVentaLinea = 0;

  modalRef: BsModalRef;

  private unsubscribe = new Subject(); // Activa y desactiva el observable para no consumir mem al dope

  constructor(
    private prodserv: ProductosService,
    private clieserv: ClientesService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.prodserv.getProductos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.productos = res; });
    this.clieserv.getClientes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.clientes = res; });

  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  // Abre el modal con los datos
  openModal(template: TemplateRef<any>, enc: any, det: any) {
    this.encabezado = {
      fecha: enc.fecha,
      comprobante: enc.comprobante,
      nombreCliente: enc.infoCliente.split(',')[0],
      infoCliente: enc.infoCliente,
      direccionCliente: enc.infoCliente.split(',')[1],
      telefonoCliente: enc.infoCliente.split(',')[2],
      cuitCliente: enc.infoCliente.split(',')[3],
      creditoMaximoCliente: +enc.infoCliente.split(',')[5],
      creditoDisponibleCliente: +enc.infoCliente.split(',')[4]
    };
    this.detalle = {
      idProducto: det.idProducto,
      nombreProducto: det.nombreProducto,
      precioUnitario: det.precioUnitario,
      precioCompra: det.precioCompra,
      precioVenta: det.precioVenta,
      cantidadEgreso: det.cantidadEgreso,
      precioTotalLinea: det.precioTotalLinea
    }
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }


  agregarItem(enc: Encabezado, det: Detalle) {
    this.encabezado = enc;
    const idProducto = det.idProducto.split(',')[0];
    const nombreProducto = det.idProducto.split(',')[1];
    const existenciaProducto = +det.idProducto.split(',')[2];
    const precioVenta = +det.idProducto.split(',')[3];
    const cantidadEgreso = +det.cantidadEgreso;
    const precioTotalLinea = +precioVenta * cantidadEgreso;
    this.detalleItem = {
      idProducto,
      nombreProducto,
      existenciaProducto,
      precioVenta,
      cantidadEgreso,
      precioTotalLinea
    };
    this.detalleArray.push(this.detalleItem);
    if (this.detalleArray.length > 0) {
      this.items = true;
    } else {
      this.items = false;
    }
    this.detalleItem = {} as Detalle;
    console.log('DetalleItem Obj:', this.detalleItem);
    console.log('Detalle Array:', this.detalleArray);
   }

  cambioProducto(valorSelect) {
    const completo = valorSelect.target.value;
    const idProducto = completo.split(',')[0];
    const nomProducto = completo.split(',')[1];
    this.cantidadExistencia = +completo.split(',')[2];
    this.precioVentaProvisorio = +completo.split(',')[3]
    this.calculoSubtotal(this.cantidadLinea);
  }
  calculoSubtotal(valor) {
    console.log(valor);
    this.precioVentaLinea = this.precioVentaProvisorio * valor ;

  }
}
