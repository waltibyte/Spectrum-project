import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '',  pathMatch: 'full', redirectTo: 'portal' },
  { path: 'portal', loadChildren: () => import('./portal/portal.module').then(m => m.HomepageModule) },
  { path: 'user-area', loadChildren: () => import('./userarea/user-area.module').then(m => m.UserAreaModule) },
  {path: '**', redirectTo: 'portal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
