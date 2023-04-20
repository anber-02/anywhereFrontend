import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateRestaurantePageRoutingModule } from './create-restaurante-routing.module';

import { CreateRestaurantePage } from './create-restaurante.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateRestaurantePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateRestaurantePage]
})
export class CreateRestaurantePageModule {}
