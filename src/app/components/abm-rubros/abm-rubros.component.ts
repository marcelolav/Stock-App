import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { RubrosService } from 'src/app/services/rubros.service';
import { Rubro } from 'src/app/interfaces/rubro';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ang-abm-rubros',
  templateUrl: './abm-rubros.component.html',
  styleUrls: ['./abm-rubros.component.css']
})
export class AbmRubrosComponent implements OnInit, OnDestroy {

  constructor( 
    private rubSer: RubrosService,
    private modalService: BsModalService,
  ) { }
  rubros = [];
  regRubro = {} as Rubro;
  modalRef: BsModalRef;
  private unsubscribe = new Subject();

  ngOnInit() {
    this.rubSer.getRubros()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.rubros = res; });
  }

  agregaRubro(rubro: Rubro) {
    // @ts-ignore
    if (this.regRubro.activo === 'true') {
      this.regRubro = {
        nombreRubro: rubro.nombreRubro,
        activo: true
      };
    } else {
      this.regRubro = {
        nombreRubro: rubro.nombreRubro,
        activo: false
      };
    }
    this.rubSer.addRubro(this.regRubro);
    this.regRubro = {} as Rubro;
    this.modalRef.hide();
  }

  confirmaEdicion(rubro: Rubro) {
     // @ts-ignore
    if (this.regRubro.activo === 'true') {
      this.regRubro = {
        id: rubro.id,
        nombreRubro: rubro.nombreRubro,
        activo: true
      };
    } else {
      this.regRubro = {
        id: rubro.id,
        nombreRubro: rubro.nombreRubro,
        activo: false
      };
    }
    this.rubSer.updateRubro(this.regRubro);
    this.regRubro = {} as Rubro;
    this.modalRef.hide();

  }
  confirmaEliminar(rubro: Rubro) {
    // @ts-ignore
    if (this.regRubro.activo === 'true') {
      this.regRubro = {
        id: rubro.id,
        nombreRubro: rubro.nombreRubro,
        activo: true
      };
    } else {
      this.regRubro = {
        id: rubro.id,
        nombreRubro: rubro.nombreRubro,
        activo: false
      };
    }
    this.rubSer.deleteRubro(this.regRubro);
    this.regRubro = {} as Rubro;
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.regRubro = {
      id: data.id,
      nombreRubro: data.nombreRubro,
      activo: data.activo
    };
    this.modalRef = this.modalService.show(template);
  }
  ngOnDestroy(){
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}
