import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Rubro } from '../interfaces/rubro';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  rubrosCollection: AngularFirestoreCollection<Rubro>;
  rubrosDoc: AngularFirestoreDocument<Rubro>;
  rubros: Observable<Rubro[]>;

  constructor(public afs: AngularFirestore) {
    this.rubrosCollection = this.afs.collection('rubros');
    this.rubros = this.rubrosCollection
      .snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Rubro;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }
  getRubros() {
    return this.rubros;
  }
  addRubro(rubro: Rubro) {
    this.rubrosCollection.add(rubro);
  }
  updateRubro(rubro: Rubro) {
    this.rubrosDoc = this.afs.doc(`rubros/${rubro.id}`);
    this.rubrosDoc.update(rubro);
  }
  deleteRubro(rubro: Rubro) {
    this.rubrosDoc = this.afs.doc(`rubros/${rubro.id}`);
    this.rubrosDoc.delete();
  }
}
