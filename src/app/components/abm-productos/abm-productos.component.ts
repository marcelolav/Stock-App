import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Producto } from 'src/app/interfaces/producto';
import { RubrosService } from 'src/app/services/rubros.service';

@Component({
  selector: 'ang-abm-productos',
  templateUrl: './abm-productos.component.html',
  styleUrls: ['./abm-productos.component.css']
})
export class AbmProductosComponent implements OnInit, OnDestroy {

  constructor(
    private prodServ: ProductosService,
    private provServ: ProveedoresService,
    private rubser: RubrosService,
    private modalService: BsModalService
  ) { }

  productos = [];
  proveedores = [];
  rubros = [];
  regProducto = {} as Producto;
  modalRef: BsModalRef;
  private unsubscribe = new Subject();
  ofertaboolean: boolean;

  ngOnInit() {
    this.provServ.getProveedores()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.proveedores = res; });  // Lleno el array de proveedores
    this.prodServ.getProductos()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.productos = res; });  // lleno el array de productos ( si no hay ninguno sigue vacio )
    this.rubser.getRubros()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.rubros = res; });
  }

  openModal(template: TemplateRef<any>, data: any) {
    this.regProducto = {
      id: data.id,
      nombreProducto: data.nombreProducto,
      nombreRubro: data.nombreRubro,
      proveedor: data.proveedor,
      existencia: data.existencia,
      precioCompra: data.precioCompra,
      precioVenta: data.precioVenta,
      esOferta: data.esOferta,
      urlImagen: data.urlImagen
    };
    this.modalRef = this.modalService.show(template);
  }
  agregarProducto(producto: Producto) {
    // @ts-ignore
    if (producto.esOferta === 'true') {
      this.ofertaboolean = true;
    } else {
      this.ofertaboolean = false;
    }
    producto.esOferta = this.ofertaboolean;  // Para saber si es true o false
    producto.id = '';
    if (this.regProducto.urlImagen !== '') {
      producto.urlImagen = this.regProducto.urlImagen;
    } else {
      producto.urlImagen = '';
    }
    this.prodServ.addProducto(producto);
    this.modalRef.hide();
  }
  openModalAlta(template: TemplateRef<any>, data: any) {
    this.regProducto = { } as Producto;
    this.modalRef = this.modalService.show(template);
  }
  editarProducto(producto: Producto) {
    console.log(producto);
    this.prodServ.updateProducto(producto);
    this.modalRef.hide();
  }
  elimDefinitivaProducto(producto: Producto) {
    this.prodServ.deleteProducto(producto);
    this.modalRef.hide();
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
