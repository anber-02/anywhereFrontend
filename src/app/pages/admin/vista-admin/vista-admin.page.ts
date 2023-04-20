import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Servicio } from 'src/app/models/servicios.models';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';

@Component({
  selector: 'app-vista-admin',
  templateUrl: './vista-admin.page.html',
  styleUrls: ['./vista-admin.page.scss'],
})
export class VistaAdminPage implements OnInit {
  servicios:any = [
    { nombre: "hoteles" },
    { nombre: "tiendas" },
    { nombre: "restaurantes" },
  ]
  url = "";
  typeSelected=this.servicios[0].nombre;
  infoServicios:Servicio[] = []

  constructor( 
    private puebloService:PuebloService,
    private loadingController: LoadingController,
    private router:Router
    ) {
    this.mostrarLoading()   
    this.getData(this.typeSelected)
  }

  ngOnInit(): void {}
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

  handleDelete(){
    
  }

  createServicio(){
    if(this.typeSelected === 'hoteles'){
      this.router.navigate(["/create-hotel"]);
    }
    if(this.typeSelected === 'restaurantes'){
      this.router.navigate(["/create-restaurante"]);
  
    }
    if(this.typeSelected === 'tiendas'){
      this.router.navigate(["/create-tienda"]);
    }
  }


}
