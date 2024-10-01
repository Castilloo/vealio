import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule
  ],
  exports: [
    SidenavComponent
  ]
})
export class LayoutModule { }
