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
  }
  ingresarStock(dato) {

    console.log(dato);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
