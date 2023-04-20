import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  imagenes: any[] = []
  userData: any = {
    name: '',
    last_name: '',
    url_image: '',
    comentarios: []
  }

  tipos: any = [
    'hoteles','tiendas', 'restaurantes', 'hole', 'goas', 'asdhj'
  ]
  url = 'https://imgs.search.brave.com/ne-HuorKVfDreOpSwQY44K4-HA1NtqFzsZWjXGkbkbc/rs:fit:1200:1067:1/g:ce/aHR0cDovLzIuYnAu/YmxvZ3Nwb3QuY29t/Ly1fYU0zSEdlRjlM/RS9WQWMxM3R3OHRm/SS9BQUFBQUFBQ1RY/Zy9HN2hUOUZERndU/by9zMTYwMC9wYWlz/YWplcyUyQm5hdHVy/YWxlcyUyQi0lMkJu/YXR1cmFsZXphJTJC/LSUyQm5hdHVyYWwl/MkJmcmVlJTJCbGFu/ZHNjYXBlcyUyQi0l/MkJmb3RvcyUyQmRl/JTJCcGFpc2FqZXMl/MkIoNSkuanBn';

  tiendaForm: FormGroup = new FormGroup({})
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private actionSheet: ActionSheetController,
    private route: Router

  ) { }

  async openMenu() {
    const actionSheet = await this.actionSheet.create({
      header: "Menu",
      mode: 'ios',
      buttons: [
        {
          text: "Editar perfil",
          handler: () => { 
            console.log(' perfil') 
            this.route.navigate(['/edit-user',this.userData.id])
        }
        },
        {
          text: "Ir a la vista de admin",
          handler: () => { 
            this.route.navigate(['/vista-admin']);
           },
          cssClass: this.userData.tipo === 'admin' ? '' : 'ion-hide'
        },
        {
          text: "Cerrar sesion",
          handler: () => { 
            console.log('cerrando tienda')
            localStorage.removeItem('token')
            this.authService.leerToken()
            this.route.navigate(['/login'])
          }
        }

      ]
    })

    await actionSheet.present()
  }


  ngOnInit(): void {
    let id  = JSON.parse(localStorage.getItem('token') || '[]').user.id || "";
    this.authService.getUserByID(id).subscribe((data: any) => {
      this.userData = data.data
      console.log(this.userData)
    })
  }

}
