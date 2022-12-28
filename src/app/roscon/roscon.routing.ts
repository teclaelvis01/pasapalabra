import { Routes, RouterModule } from '@angular/router';
import { CircleComponent } from './components/circle/circle.component';
import { ControlComponent } from './components/control/control.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {
    component:MainComponent,
    path: ''
  },
  {
    component:ControlComponent,
    path: 'control'
  },
];

export const CircleRoutes = RouterModule.forChild(routes);
