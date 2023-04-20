import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'experience',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {

        path: 'profile',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'tienda/:id',
    loadChildren: () => import('../../tienda/tienda.module').then( m => m.TiendaPageModule),
  },
  {
    path: 'hotele/:id',
    loadChildren: () => import('../../hoteles/hotel/hotel.module').then( m => m.HotelPageModule),
  },
  {
    path: 'restaurante/:id',
    loadChildren: () => import('../../restaurantes/restaurante/restaurante.module').then( m => m.RestaurantePageModule),
  },
    //Rutas para crear  
  {
    path: 'create-restaurante',
    loadChildren: () => import('../../restaurantes/create-restaurante/create-restaurante.module').then( m => m.CreateRestaurantePageModule)
  },
  {
    path: 'create-hotel',
    loadChildren: () => import('../../hoteles/create-hotel/create-hotel.module').then( m => m.CreateHotelPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
