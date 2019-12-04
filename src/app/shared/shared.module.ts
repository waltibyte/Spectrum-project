import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CalendarEventComponent } from './component/calendar-event/calendar-event.component';
import { CalendarModule } from 'angular-calendar';
import { TotalMemberEventPipe } from './pipe/total-member-event.pipe';


@NgModule({
  declarations: [PagenotfoundComponent, CalendarEventComponent, TotalMemberEventPipe],
  imports: [
    CommonModule,
    MDBBootstrapModule,
    CalendarModule
  ],
  exports: [
    PagenotfoundComponent,
    CalendarEventComponent,
    TotalMemberEventPipe
  ]
})
export class SharedModule { }
