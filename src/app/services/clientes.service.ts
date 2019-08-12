import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  clientesCollection: AngularFirestoreCollection<Cliente>;
  clientesDoc: AngularFirestoreDocument<Cliente>;
  clientes: Observable<Cliente[]>;

  constructor(public afs: AngularFirestore) { 
    this.clientesCollection = this.afs.collection('clientes');
    this.clientes = this.clientesCollection
      .snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Cliente;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }
  getClientes() {
    return this.clientes;
  }
  addCliente(cliente: Cliente) {
    this.clientesCollection.add(cliente);
  }
  updateCliente(cliente: Cliente) {
    console.log(cliente);
    this.clientesDoc = this.afs.doc(`clientes/${cliente.id}`);
    this.clientesDoc.update(cliente);
  }
  deleteCliente(cliente: Cliente) {
    this.clientesDoc = this.afs.doc(`clientes/${cliente.id}`);
    this.clientesDoc.delete();
  }
}
