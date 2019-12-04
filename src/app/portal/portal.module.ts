import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './portal-routing.module';
import { PortalComponent } from './portal.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [PortalComponent, HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    MDBBootstrapModule
  ],
  exports: [PortalComponent, HomepageComponent]
})
export class HomepageModule { }
