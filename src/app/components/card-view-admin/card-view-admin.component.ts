import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { PuebloService } from '../../services/pueblo/pueblo.service';

@Component({
  selector: 'app-card-view-admin',
  templateUrl: './card-view-admin.component.html',
  styleUrls: ['./card-view-admin.component.scss'],
})
export class CardViewAdminComponent  implements OnInit {

  @Input() servicio!:any
  @Input() tipo!:any
  url='https://imgs.search.brave.com/ne-HuorKVfDreOpSwQY44K4-HA1NtqFzsZWjXGkbkbc/rs:fit:1200:1067:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/Ly1fYU0zSEdlRjlM/RS9WQWMxM3R3OHRm/SS9BQUFBQUFBQ1RY/Zy9HN2hUOUZERndU/by9zMTYwMC9wYWlz/YWplcyUyQm5hdHVy/YWxlcyUyQi0lMkJu/YXR1cmFsZXphJTJC/LSUyQm5hdHVyYWwl/MkJmcmVlJTJCbGFu/ZHNjYXBlcyUyQi0l/MkJmb3RvcyUyQmRl/JTJCcGFpc2FqZXMl/MkIoNSkuanBn';
 
  title:any = ""
  id:any
  constructor(
    private router:Router,
    private alertController:AlertController,
    private puebloService:PuebloService,
    private toastController:ToastController
    ) { }

  ngOnInit() {
    console.log(this.tipo)

    if(this.servicio.idTiendas){
      this.title = "tienda"
    }

    if(this.servicio.idHoteles){
      this.title = "hotel"

    }
    if(this.servicio.idRestaurantes){
      this.title = "restaurante"
    }

  }

  navigate(id:any){ 
    console.log(id)
    if(this.tipo === 'hoteles'){
      this.router.navigate(["/create-hotel"], {queryParams: {id:id}});
    }
    if(this.tipo === 'restaurantes'){
      this.router.navigate(["/create-restaurante"], {queryParams: {id: id}});

    }
    if(this.tipo === 'tiendas'){
      this.router.navigate(["/create-tienda"], {queryParams: {id: id}});
    }
    
  }
  
  createServicio(){
    if(this.tipo === 'hoteles'){
      this.router.navigate(["/create-hotel"]);
    }
    if(this.tipo === 'restaurantes'){
      this.router.navigate(["/create-restaurante"]);
  
    }
    if(this.tipo === 'tiendas'){
      this.router.navigate(["/create-tienda"]);
    }
  }



  handleDelete(id:any){
    if(this.tipo === 'hoteles'){
      this.deleteProduct(id, 'hotel')
    }
    if(this.tipo === 'restaurantes'){
      this.deleteProduct(id, 'restaurante')
    }
    if(this.tipo === 'tiendas'){
      this.deleteProduct(id, 'tienda')
    }
  }
  async deleteProduct(id: number, ruta:any) {
    const alert = await this.alertController.create({
      header: "Eliminar",
      subHeader:"Esta seguro de eliminar",
      buttons: [
        {
          text: 'Acceptar', handler: () => {
            this.puebloService.deleteServicio(id, ruta).subscribe((data: any) => {
              console.log(data)
              this.presentToast(data[0], 'bottom', 'trash')
            })
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    })
    await alert.present()
  }

  async presentToast(message: string, position: 'bottom' | 'top', icon: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
      icon: icon
    })
    await toast.present()
  }

}
