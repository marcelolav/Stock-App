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
import { Encabezado } from 'src/app/interfaces/encabezado';
import { Detalle } from 'src/app/interfaces/detalle';

@Component({
  selector: 'ang-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit, OnDestroy {

  encabezado = {} as Encabezado;
  detalle = {} as Detalle;
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
  // Inicializo los combos con las respectivas cosas
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
  // Agrega el item de movimiento a la lista temporal Parametros:(ARRAYs: itemsDetalle / encabezado)
  agregarItem(data, prov) {
    if (Object.keys(data).length < 4 ) {
      console.log('objeto vacio! o no estan todos los campos');
    } else {
      data.idProducto2 = data.idProducto.split(',')[0];
      data.nombreProducto2 = data.idProducto.split(',')[1].trim();
      data.existenciaProducto = +data.idProducto.split(',')[2];
      this.movimientos = Object.assign(data, prov);
      this.items = true;
      this.itemsDetalle.push(this.movimientos);
      this.totalCantidad = this.totalCantidad + data.cantidadIngreso;
      this.totalCompra = this.totalCompra + data.precioCompra;

      this.detalle = {} as Detalle;
      this.encabezado = {
        fecha: data.fecha,
        nombreProveedor: data.nombreProveedor,
        comprobante: data.comprobante
      };
    }
  }
  borraElementoDetalle(i, tcant, timporte) {
    this.totalCantidad = this.totalCantidad - tcant;
    this.totalCompra = this.totalCompra - timporte;
    this.itemsDetalle.splice(i, 1);
  }
  ingresarStock(dato) {
    this.items = false;
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.encabezado = {
      fecha: data.fecha,
      nombreProveedor: data.nombreProveedor,
      comprobante: data.comprobante
    };
    this.modalRef = this.modalService.show(template);
    this.modalRef.setClass('modal-lg');
  }
  calcularCompra(dato: any) {
    const numero = +dato.target.value;
    this.detalle.precioCompra = numero * this.detalle.cantidadIngreso;
  }
  confirmaDefinitiva(enc, it, tcant, tcomp) {
    it.forEach(item => {
      const datoTotal = Object.assign(enc, item);
      this.regIngreso = {
        fecha: datoTotal.fecha,
        comprobante: datoTotal.comprobante,
        tipoMovimiento: 'Ingreso',
        idProducto: datoTotal.idProducto2,
        nombreProducto: datoTotal.nombreProducto2,
        nombreProveedor: datoTotal.nombreProveedor,
        nombreCliente: '-',
        cantidadEgreso: 0,
        cantidadIngreso: datoTotal.cantidadIngreso,
        precioUnitario: datoTotal.precioUnitario,
        precioCompra: datoTotal.precioUnitario,
        precioVenta: datoTotal.precioVenta
      };
      this.movSer.addMovimiento(this.regIngreso);
      const cantidadActualizar = item.existenciaProducto + datoTotal.cantidadIngreso;
      this.prdSer.updatePrecioProducto(
        this.regIngreso.idProducto,
        this.regIngreso.precioCompra,
        this.regIngreso.precioVenta);
      this.prdSer.updateExistencia(
        this.regIngreso.idProducto,
        cantidadActualizar
      );
    });
    this.encabezado = {} as Encabezado;
    this.detalle = {} as Detalle;
    this.itemsDetalle = [];
    this.modalRef.hide()
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
