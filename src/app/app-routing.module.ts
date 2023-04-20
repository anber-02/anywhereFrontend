import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from './guard/logueado.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [LogueadoGuard]
  },
  {
    path: 'vista-admin',
    loadChildren: () => import('./pages/admin/vista-admin/vista-admin.module').then( m => m.VistaAdminPageModule)
  },
  {
    path: 'create-tienda',
    loadChildren: () => import('./pages/tiendas/create-tienda/create-tienda.module').then( m => m.CreateTiendaPageModule)
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./pages/user/edit-user/edit-user.module').then( m => m.EditUserPageModule)
  }
 
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
