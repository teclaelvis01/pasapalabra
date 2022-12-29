import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'',
    component:AppComponent
  },
  {
    path:'p',
    loadChildren:() => import('./roscon/roscon.module').then(m=>m.CircleModule)
  },
  {
    path:'n',
    loadChildren:() => import('./nominations/nominations.module').then(m=>m.NominationsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
