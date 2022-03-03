import { Component, OnInit } from '@angular/core';
import { async } from '@firebase/util';
import { AlertController, LoadingController, MenuController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models';
import { FiestorageService } from 'src/app/services/fiestorage.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.scss'],
})
export class SetProductosComponent implements OnInit {
  //variables globales
  productos: Producto[] = [];

  newProducto: Producto;


  enableNewProducto = false;

  private path = 'Producto/';

  // eslint-disable-next-line @typescript-eslint/member-ordering
  loading: any;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newImage = '';
  // eslint-disable-next-line @typescript-eslint/member-ordering
  newFail = '';

  constructor(
    public menucontroler: MenuController,
    public firestoreService: FirestoreService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public alertController: AlertController,
    public fiestorageService: FiestorageService
    ) { }

  ngOnInit() {
    this.getProductos();
  }

  openMenu(){
    console.log('Open Menu');
    this.menucontroler.toggle('principal');
  }

  async guardarProducto(){
        this.presentLoading();
        const path = 'Productos';
        const name = this.newProducto.nombre;
        const res = await this.fiestorageService.uploadImag(this.newFail,path,name);
        this.newProducto.foto = res;
        this.firestoreService.creartDoc(this.newProducto,this.path,this.newProducto.id).then( () =>{
          this.loading.dismiss();
          this.presentToast('Guardo con exito...');
        }).catch(erro => {
          this.presentToast('No se pudo guardar');
        });
  }

  getProductos(){
    this.firestoreService.getColleccion<Producto>(this.path).subscribe(res => {
       this.productos = res;
    });
  }
 async elimiarProducto(producto: Producto){
        const alert = await this.alertController.create({
        cssClass: 'normal',
        header: 'Advertencia',
        message: 'Seguro que desea <strong>eliminar</strong> este producto',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'normal',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Okay',
            id: 'confirm-button',
            handler: () => {
              console.log('Confirm Okay');
              this.firestoreService.deleteDoc(this.path,producto.id).then(res =>{
                 this.presentToast('Eiminado con exito...');
                 this.alertController.dismiss();
                }).catch(erro => {
                this.presentToast('No se pudo Eliminar');
                });
            }
          }
        ]
      });

      await alert.present();

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

  //loading efecto para cuando esta cargando
  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'Se esta guardadndo...',
    });
    await this.loading.present();

    //const { role, data } = await loading.onDidDismiss();
    //console.log('Loading dismissed!');
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      cssClass: 'normal',
      message: msg,
      duration: 2000,
      color: 'light'
    });
    toast.present();
  }

  async newImageload(event: any){

   if (event.target.files && event.target.files[0]) {
      this.newFail = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;

      });
      reader.readAsDataURL(event.target.files[0]);
    }

  }

}
