import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Servicio } from 'src/app/models/servicios.models';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit {

  servicio:Servicio = {
    nombre: '',
    comentarios: [],
    contacto_correo: '',
    contacto_tel: '',
    direccion: '',
    imagenes: [],
    idTiendas: 1,
  };
  imagenes:any[] =[]

  idTienda:any
  idUser = (JSON.parse(localStorage.getItem('token') || '[]') || "").user.id;

  comentarioForm:FormGroup = new FormGroup({})

  constructor(
    private puebloService:PuebloService,
    private activateRouter:ActivatedRoute,
    private formBuilder: FormBuilder

    ) { }

  ngOnInit() {
    this.activateRouter.params.subscribe((data:any) => {
      console.log(data)
      this.getTienda(data.id)
    })
    this.initialForms()
  }
  
  getTienda(id:any){
    let ruta = 'tienda'
    this.idTienda = id
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
      idTienda: [this.idTienda, Validators.required],
    })
  }

  crearComentario(idTienda:any){
    if(this.comentarioForm.valid){
      this.puebloService.createComment({...this.comentarioForm.value, ...idTienda}).subscribe((data:any) => {
        console.log(data)
      })
    }
  }
}
