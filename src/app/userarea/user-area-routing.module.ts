import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MembersComponent } from './members/members.component';
import { EventsComponent } from './events/events.component';
import { UserAreaComponent } from './user-area.component';
import { PagenotfoundComponent } from '../shared/pagenotfound/pagenotfound.component';


const routes: Routes = [
  {
    path: '', component: UserAreaComponent,
    children: [
      {
        path: '',
        redirectTo: 'members',
        pathMatch: 'full'
      },
      {
        path: 'members', component: MembersComponent,
      },
      {
        path: 'events', component: EventsComponent
      },
      {
        path: '**', component: PagenotfoundComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAreaRoutingModule { }
