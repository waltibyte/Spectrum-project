import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './homepage-routing.module';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { HomepageComponent } from './homepage.component';


@NgModule({
  declarations: [MembersComponent, EventsComponent, HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  exports: [MembersComponent, EventsComponent, HomepageComponent]
})
export class HomepageModule { }
