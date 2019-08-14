import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Producto } from '../interfaces/producto';
import { Proveedor } from '../interfaces/proveedor';
import { Cliente } from '../interfaces/cliente';
import { Movimientos } from '../interfaces/movimientos';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovimientosService {

  movimientosCollection: AngularFirestoreCollection<Movimientos>;
  movimientosDoc: AngularFirestoreDocument<Movimientos>;
  movimientos: Observable<Movimientos[]>;

  constructor(public afs: AngularFirestore) { 
    this.movimientosCollection = this.afs.collection('movimientos');
    this.movimientos = this.movimientosCollection
      .snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Movimientos;
          const id = a.payload.doc.id;
          return { id, ...data };
      })
    ))
  }
  getMovimientos() {
    return this.movimientos;
  }

  addMovimiento(movimiento: Movimientos) {
    this.movimientosCollection.add(movimiento);
  }
  updateMovimiento(movimiento: Movimientos) {
    this.movimientosDoc = this.afs.doc(`movimientos/${movimiento.id}`);
    this.movimientosDoc.update(movimiento);
  }
  deleteMovimiento(movimiento: Movimientos) {
    this.movimientosDoc = this.afs.doc(`movimientos/${movimiento.id}`);
    this.movimientosDoc.delete();
  }

}
