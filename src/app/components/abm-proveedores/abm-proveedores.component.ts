import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { Proveedor } from 'src/app/interfaces/proveedor';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ang-abm-proveedores',
  templateUrl: './abm-proveedores.component.html',
  styleUrls: ['./abm-proveedores.component.css']
})
export class AbmProveedoresComponent implements OnInit, OnDestroy {

  constructor(
    private provServ: ProveedoresService,
    private modalService: BsModalService
  ) { }

  proveedores = [];
  regProveedor = {} as Proveedor;
  modalRef: BsModalRef;
  private unsubscribe = new Subject();

  ngOnInit() {
    this.provServ.getProveedores()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.proveedores = res; });
  }

  agregarProveedor(proveedor: Proveedor) {
    this.regProveedor = {
      nombre: proveedor.nombre,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      cuit: proveedor.cuit
    };
    this.provServ.addProveedor(this.regProveedor);
    this.regProveedor = {} as Proveedor;
    this.modalRef.hide();
  }

  confirmaEdicion(proveedor: Proveedor) {
    this.provServ.updateProveedor(proveedor);
    this.regProveedor = {} as Proveedor;
    this.modalRef.hide();
  }
  confirmaEliminar(proveedor: Proveedor) {
    this.provServ.deleteProveedor(proveedor);
    this.regProveedor = {} as Proveedor;
    this.modalRef.hide(); 
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.regProveedor = {
      id: data.id,
      nombre: data.nombre,
      direccion: data.direccion,
      telefono: data.telefono,
      cuit: data.cuit
    };
    this.modalRef = this.modalService.show(template);
  }
  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
