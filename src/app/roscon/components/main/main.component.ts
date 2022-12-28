import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { ParticipateI } from 'src/app/services/models/PasapalabraModels';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  subs$: Subscription[] = [];
  participate1: ParticipateI | undefined;
  participate2: ParticipateI | undefined;
  @ViewChild("main") mainHtml: ElementRef | undefined;

  constructor(
    private firebaseService: FirebaseService,
  ) { }
  ngOnDestroy(): void {
    this.subs$.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    const subs1 = this.firebaseService.loadParticipate("p1").subscribe(res => {
      if (!res) {
        return;
      }
      this.participate1 = res;
    });
    const subs2 = this.firebaseService.loadParticipate("p2").subscribe(res => {
      if (!res) {
        return;
      }
      this.participate2 = res;
    });
    this.subs$.push(subs1);
    this.subs$.push(subs2);
  }

  onFullScreen() {
    if (!document.fullscreenElement) {
      this.mainHtml?.nativeElement.requestFullscreen();
      return;
    }
    document.exitFullscreen();
  }

}
