import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateRestaurantePage } from './create-restaurante.page';

const routes: Routes = [
  {
    path: '',
    component: CreateRestaurantePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateRestaurantePageRoutingModule {}
