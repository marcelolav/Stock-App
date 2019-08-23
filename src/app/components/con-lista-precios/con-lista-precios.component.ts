import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'ang-con-lista-precios',
  templateUrl: './con-lista-precios.component.html',
  styleUrls: ['./con-lista-precios.component.css']
})
export class ConListaPreciosComponent implements OnInit {

  private unsubscribe = new Subject();
  productos = [];
  productoFiltro: any = { nombreProducto: '' };

  constructor(private prodserv: ProductosService) { 
    this.prodserv.getProductos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.productos = res; });
  }

  ngOnInit() {
  }

}
