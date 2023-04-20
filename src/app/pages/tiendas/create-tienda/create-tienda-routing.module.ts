import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTiendaPage } from './create-tienda.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTiendaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTiendaPageRoutingModule {}
