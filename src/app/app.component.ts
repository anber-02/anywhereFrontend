import { Component } from '@angular/core';
import {register} from 'swiper/element/bundle'

register()

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {}
  lista:any[] = [
    {
      nombre: 'Alert',
      icon: 'rocket',
      ruta: '/alert'
    },
    {
      nombre: 'Action sheet',
      icon: 'airplane',
      ruta: '/action-sheet'
    },
    {
      nombre: 'Button',
      icon: 'people',
      ruta: '/button'
    }]
}
