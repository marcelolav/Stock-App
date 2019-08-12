import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Proveedor } from '../interfaces/proveedor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  proveedoresCollection: AngularFirestoreCollection<Proveedor>;
  proveedorDoc: AngularFirestoreDocument<Proveedor>;
  proveedor: Observable<Proveedor[]>;
  constructor(public afs: AngularFirestore) { 
    this.proveedoresCollection = this.afs.collection('proveedores');
    this.proveedor = this.proveedoresCollection
      .snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Proveedor;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }
  getProveedores() {
    return this.proveedor;
  }
  addProveedor(proveedor: Proveedor) {
    this.proveedoresCollection.add(proveedor);
  }
  updateProveedor(proveedor: Proveedor) {
    this.proveedorDoc = this.afs.doc(`proveedores/${proveedor.id}`);
    this.proveedorDoc.update(proveedor);
  }
  deleteProveedor(proveedor: Proveedor) {
    this.proveedorDoc = this.afs.doc(`proveedores/${proveedor.id}`);
    this.proveedorDoc.delete();
  }
}
