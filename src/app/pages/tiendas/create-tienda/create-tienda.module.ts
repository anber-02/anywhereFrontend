import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTiendaPageRoutingModule } from './create-tienda-routing.module';

import { CreateTiendaPage } from './create-tienda.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateTiendaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateTiendaPage]
})
export class CreateTiendaPageModule {}
