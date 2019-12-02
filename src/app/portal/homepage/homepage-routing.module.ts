import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage.component';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';


const routes: Routes = [
  {
    path: '', component: HomepageComponent
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
