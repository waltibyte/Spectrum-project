import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home'
  },
  {
    path: 'home', component: HomepageComponent,
    data: {
      title: 'Dashboard',
      icon: 'dashboard',
      status: false
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
