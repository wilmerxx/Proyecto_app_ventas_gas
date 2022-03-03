import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {

  productos: Producto[] = [];

  newProducto: Producto;

  enableNewProducto = false;

  private path = 'Producto/';

  constructor(
    public menucontroler: MenuController,
    public firestoreService: FirestoreService) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu(){
    console.log('Open Menu');
    this.menucontroler.toggle('principal');
  }

  guardarProducto(){

    const id = this.firestoreService.getId();
    this.firestoreService.creartDoc(this.newProducto,this.path,this.newProducto.id);
  }

  getProductos(){
    this.firestoreService.getColleccion<Producto>(this.path).subscribe(res => {
       this.productos = res;
    });
  }
  elimiarProducto(producto: Producto){
    this.firestoreService.deleteDoc(this.path,producto.id);
  }

  nuevo(){
    this.enableNewProducto = true;
    this.newProducto = {
      nombre: '',
      precioNormal: null,
      precioReducido: null,
      foto: '',
      id: this.firestoreService.getId(),
      fecha: new Date()
    };
  }

}
