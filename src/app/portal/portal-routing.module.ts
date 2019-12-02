import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: '', component: HomepageComponent
  },
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'members', component: MembersComponent
  },
  {
    path: 'events', component: EventsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
