import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor( public database: AngularFirestore) { }
 //funcion para crear el documento
  creartDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  //funcion para leer el documento trabaja con rutas
  // eslint-disable-next-line @typescript-eslint/naming-convention
  getDoc<tipo>(path: string, id: string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }
  //eliminar el documento
  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }
 //actualizar el documento
  updateDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  //retornar el id
  getId(){
    return this.database.createId();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  getColleccion<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }
}
