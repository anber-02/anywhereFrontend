import { Component, Input, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models/servicios.models';
import { PuebloService } from 'src/app/services/pueblo/pueblo.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  @Input() id:any
  servicio!:Servicio;
  imagenes:any[] =[]
  constructor(private puebloService:PuebloService) { }

  ngOnInit() {
    // console.log(this.id)
    // this.puebloService.getServicioById(this.id).subscribe((data:any) => {
    //   this.servicio = data.tienda
    //   this.imagenes = this.servicio.imagenes
    //   console.log(data)
    // })
  }
}
