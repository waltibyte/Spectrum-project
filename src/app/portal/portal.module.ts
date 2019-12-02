import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomepageRoutingModule } from './portal-routing.module';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { PortalComponent } from './portal.component';
import { HomepageComponent } from './homepage/homepage.component';


@NgModule({
  declarations: [MembersComponent, EventsComponent, PortalComponent, HomepageComponent],
  imports: [
    CommonModule,
    HomepageRoutingModule
  ],
  exports: [MembersComponent, EventsComponent, PortalComponent, HomepageComponent]
})
export class HomepageModule { }
