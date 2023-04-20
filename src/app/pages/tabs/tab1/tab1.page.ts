import { Component } from '@angular/core';
import { IonicSlides, LoadingController } from '@ionic/angular';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';
import { Servicio } from 'src/app/models/servicios.models';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  swiperModules = [IonicSlides]
  servicios:any = [
    { nombre: "hoteles" },
    { nombre: "tiendas" },
    { nombre: "restaurantes" },
  ]
  typeSelected=this.servicios[0].nombre;
  infoServicios:Servicio[] = []

  constructor( 
    private puebloService:PuebloService,
    private loadingController: LoadingController
    ) {
    this.mostrarLoading()   
    this.getData(this.typeSelected)
  }


  segmentChange(evento:any){ //se coloca el segement Change
    this.mostrarLoading();// aqui se pone el mostrar loading
    this.getData(evento.detail.value);
  }

  
  getData(tipo:string){
    this.typeSelected = tipo
    this.puebloService.getServicio(tipo).subscribe((data:any) => {
      if(data){
        this.loadingController.dismiss()
      }
      this.infoServicios = data.data
      console.log(this.infoServicios)
    })
  }


  async mostrarLoading(){ //se cra el async para utilizar el loading
    const load= await this.loadingController.create(
      {
        message:`Cargando...`,
        translucent:true,
        spinner:'dots',
      }
    );
    await load.present();
  }
}
