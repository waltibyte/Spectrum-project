import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: () => import('./portal/homepage/homepage.module').then(m => m.HomepageModule) },
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
