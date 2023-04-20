import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VistaAdminPageRoutingModule } from './vista-admin-routing.module';

import { VistaAdminPage } from './vista-admin.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VistaAdminPageRoutingModule,
    ComponentsModule
  ],
  declarations: [VistaAdminPage]
})
export class VistaAdminPageModule {}
