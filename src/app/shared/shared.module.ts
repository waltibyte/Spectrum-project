import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CalendarEventComponent } from './component/calendar-event/calendar-event.component';
import { CalendarModule } from 'angular-calendar';


@NgModule({
  declarations: [PagenotfoundComponent, CalendarEventComponent],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    CalendarModule
  ],
  exports: [
    PagenotfoundComponent,
    CalendarEventComponent
  ]
})
export class SharedModule { }
