import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NominationsComponent } from './nominations.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VoteComponent } from './components/vote/vote.component';
import { NominationsRoutes } from './nominations.routing';

@NgModule({
  imports: [
    CommonModule,
    NominationsRoutes
  ],
  declarations: [
    NominationsComponent,
    DashboardComponent,
    VoteComponent
  ]
})
export class NominationsModule { }
