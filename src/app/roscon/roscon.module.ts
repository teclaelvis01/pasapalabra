import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircleComponent } from './components/circle/circle.component';
import { CircleRoutes } from './roscon.routing';
import { MainComponent } from './components/main/main.component';
import { ControlComponent } from './components/control/control.component';
import { HumanTimerPipe } from '../pipes/human-timer.pipe';

@NgModule({
  imports: [
    CommonModule,
    CircleRoutes
  ],
  declarations: [
    CircleComponent,
    MainComponent,
    ControlComponent,
    HumanTimerPipe
  ]
})
export class CircleModule { }
