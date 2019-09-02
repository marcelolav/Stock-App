import { Component, OnInit, OnDestroy } from '@angular/core';
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
  regSalida = {} as Movimientos;  // interface de firestore

  private unsubscribe = new Subject(); // Activa y desactiva el observable para no consumir mem al dope

  constructor(
    private prodserv: ProductosService,
    private clieserv: ClientesService
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

  agregarItem(enc: Encabezado) {
    this.encabezado = {
      fecha: enc.fecha,
      comprobante: enc.comprobante,
      nombreCliente: enc.nombreCliente.split(',')[0],
      direccionCliente: enc.nombreCliente.split(',')[1],
      telefonoCliente: enc.nombreCliente.split(',')[2],
      cuitCliente: enc.nombreCliente.split(',')[3],
      creditoMaximoCliente: +enc.nombreCliente.split(',')[5],
      creditoDisponibleCliente: +enc.nombreCliente.split(',')[4]
    };
    console.log('Encabezado:', this.encabezado);
  }

}
