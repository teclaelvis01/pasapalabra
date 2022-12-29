import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VoteComponent } from './components/vote/vote.component';

const routes: Routes = [
  {
    path: '',
    component: VoteComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

export const NominationsRoutes = RouterModule.forChild(routes);
