import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateHotelPage } from './create-hotel.page';

const routes: Routes = [
  {
    path: '',
    component: CreateHotelPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateHotelPageRoutingModule {}
