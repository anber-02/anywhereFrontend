import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/models/servicios.models';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.page.html',
  styleUrls: ['./restaurante.page.scss'],
})
export class RestaurantePage implements OnInit {

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


  idRestaurante:any
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
      this.getRestaurante(data.id)
    })
    this.initialForms()
  }
  
  getRestaurante(id:any){
    let ruta = 'restaurante'
    this.idRestaurante = id
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
      idRestaurante: [this.idRestaurante, Validators.required],
    })
  }

  crearComentario(idRestaurante:any){
    if(this.comentarioForm.valid){
      this.puebloService.createComment({...this.comentarioForm.value, ...idRestaurante}).subscribe((data:any) => {
        console.log(data)
      })
    }
  }
}
