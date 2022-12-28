import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LetterBuild, LetterI, Participate, ParticipateI } from 'src/app/services/models/PasapalabraModels';

@Component({
  selector: 'app-circle',
  templateUrl: './circle.component.html',
  styleUrls: ['./circle.component.scss'],
  providers:[LetterBuild]
})
export class CircleComponent implements OnInit,OnDestroy,OnChanges {

  letters: LetterI[] = [];
  subs$: Subscription[] = [];
  @Input() participate: ParticipateI | undefined;

  constructor(
    private firebaseService : FirebaseService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.participate){
      this.refreshParticipate();
    }
  }
  ngOnDestroy(): void {
    // this.subs$.forEach(s=>s.unsubscribe());
  }


  ngOnInit() {
    this.refreshParticipate();
  }

  refreshParticipate():void{
    if(this.participate){
      this.letters = this.participate?.letters;
    }
  }



}
