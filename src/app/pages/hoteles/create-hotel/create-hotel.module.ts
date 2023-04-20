import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateHotelPageRoutingModule } from './create-hotel-routing.module';

import { CreateHotelPage } from './create-hotel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateHotelPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CreateHotelPage]
})
export class CreateHotelPageModule {}
