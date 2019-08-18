import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Producto } from '../interfaces/producto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productosCollection: AngularFirestoreCollection<Producto>;
  productosDoc: AngularFirestoreDocument<Producto>;
  productos: Observable<Producto[]>;
  nombreProducto: string;

  constructor(public afs: AngularFirestore) { 
    this.productosCollection = this.afs.collection('productos');
    this.productos = this.productosCollection
      .snapshotChanges()
      .pipe(map(
        actions => actions.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      ));
  }
  getProductos() {
    return this.productos;
  }
  addProducto(producto: Producto) {
    this.productosCollection.add(producto);
  }
  updateProducto(producto: Producto) {
    this.productosDoc = this.afs.doc(`productos/${producto.id}`);
    this.productosDoc.update(producto);
  }
  deleteProducto(producto: Producto) {
    this.productosDoc = this.afs.doc(`productos/${producto.id}`);
    this.productosDoc.delete();
  }
  updatePrecioProducto(idProducto, precioNuevo) {
    this.productosDoc = this.afs.doc(`productos/${idProducto}`);
    this.productosDoc.update({
      precioCompra: precioNuevo
    });
  }
  devuelvoNombreProducto(id) {
    
    // return nombre
  }
}
