import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { ClientesService } from 'src/app/services/clientes.service';
import { Cliente } from 'src/app/interfaces/cliente';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'ang-abm-clientes',
  templateUrl: './abm-clientes.component.html',
  styleUrls: ['./abm-clientes.component.css']
})
export class AbmClientesComponent implements OnInit, OnDestroy {

  constructor(
    private cliSer: ClientesService,
    private modalService: BsModalService,
  ) { }

  clientes = [];
  regCliente = {} as Cliente;
  modalRef: BsModalRef;
  private unsubscribe = new Subject();

  ngOnInit() {
    this.cliSer.getClientes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe(res => { this.clientes = res; });
  }

  agregarCliente(cliente: Cliente) {
    this.regCliente = {
      nombreCliente: cliente.nombreCliente,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      cuit: cliente.cuit,
      creditoActual: cliente.creditoActual,
      creditoDisponible: cliente.creditoDisponible
    };
    this.cliSer.addCliente(this.regCliente);
    this.regCliente = {} as Cliente;
    this.modalRef.hide();
  }

  confirmaEdicion(cliente: Cliente) {
    this.cliSer.updateCliente(cliente);
    this.regCliente = {} as Cliente;
    this.modalRef.hide();
  }
  confirmaEliminar(cliente: Cliente) {
    this.cliSer.deleteCliente(cliente);
    this.regCliente = {} as Cliente;
    this.modalRef.hide();
  }
  openModal(template: TemplateRef<any>, data: any) {
    this.regCliente = {
      id: data.id,
      nombreCliente: data.nombreCliente,
      direccion: data.direccion,
      telefono: data.telefono,
      cuit: data.cuit,
      creditoActual: data.creditoActual,
      creditoDisponible: data.creditoDisponible
    };
    this.modalRef = this.modalService.show(template);
  };

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
