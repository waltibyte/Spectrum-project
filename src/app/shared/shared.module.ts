import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';



@NgModule({
  declarations: [PagenotfoundComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule
  ],
  exports: [
    PagenotfoundComponent
  ]
})
export class SharedModule { }
