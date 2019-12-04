import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { UserAreaRoutingModule } from './user-area-routing.module';
import { UserAreaComponent } from './user-area.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { OrderModule } from 'ngx-order-pipe';
import { SharedModule } from '../shared/shared.module';
import { CalendarModule } from 'angular-calendar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserAreaComponent, TopMenuComponent, MembersComponent, EventsComponent ],
  imports: [
    CommonModule,
    UserAreaRoutingModule,
    OrderModule,
    CalendarModule,
    MDBBootstrapModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [UserAreaComponent, TopMenuComponent, MembersComponent, EventsComponent],
  providers: [ DatePipe ]
})
export class UserAreaModule { }
