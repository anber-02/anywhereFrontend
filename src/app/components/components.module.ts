import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalComponent } from './modal/modal.component';
import { ServicioComponent } from './servicio/servicio.component';
import { CardComentarioComponent } from './card-comentario/card-comentario.component';
import { CardViewAdminComponent } from './card-view-admin/card-view-admin.component';



@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ModalComponent,ServicioComponent, 
    CardComentarioComponent,
    CardViewAdminComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [ModalComponent, ServicioComponent, CardComentarioComponent, CardViewAdminComponent]
})
export class ComponentsModule { }
