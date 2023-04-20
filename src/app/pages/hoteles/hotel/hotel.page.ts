import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/models/servicios.models';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';


@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.page.html',
  styleUrls: ['./hotel.page.scss'],
})
export class HotelPage implements OnInit {

  servicio:any = {
    nombre: '',
    comentarios: [],
    contacto_correo: '',
    contacto_tel: '',
    direccion: '',
    imagenes: [],
    idTiendas: 1,
  };
  imagenes:any[] =[]



  idHotel:any
  idUser = (JSON.parse(localStorage.getItem('token') || '[]') || "").user.id;

  comentarioForm:FormGroup = new FormGroup({})

  constructor(
    private puebloService:PuebloService,
    private activateRouter:ActivatedRoute,
    private formBuilder:FormBuilder
    ) { }

  ngOnInit() {
    
    this.activateRouter.params.subscribe((data:any) => {
      console.log(data)
      this.getHotel(data.id)
    })
    this.initialForms()
  }
  
  getHotel(id:any){
    let ruta = 'hotel'
    this.idHotel = id
    this.puebloService.getServicioById(id, ruta).subscribe((data:any) => {
      this.servicio = data.data
      this.imagenes = this.servicio.imagenes
      console.log(data)
    })
  }

  initialForms() {
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', Validators.required],
      idUser: [this.idUser, Validators.required],
      idHotel: [this.idHotel, Validators.required],
    })
  }
  crearComentario(idHotel:any){
    console.log(idHotel)
    console.log(this.comentarioForm.value)
    if(this.comentarioForm.valid){
      this.puebloService.createComment({...this.comentarioForm.value, ...idHotel}).subscribe((data:any) => {
        console.log(data)
      })
    }
  }

}
