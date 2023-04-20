import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestaurantePageRoutingModule } from './restaurante-routing.module';

import { RestaurantePage } from './restaurante.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestaurantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestaurantePage]
})
export class RestaurantePageModule {}
