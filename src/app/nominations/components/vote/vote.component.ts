import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FbNominationsService } from 'src/app/services/fbNominations.service';
import { Nomination, Participate } from 'src/app/services/models/Nominations.model';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.scss']
})
export class VoteComponent implements OnInit, OnDestroy {

  currentPosition: number = 0;
  currentNomination: Nomination | undefined;
  nominations: Nomination[] = [];
  subs$: Subscription[] = [];
  sessionId: string = '';
  isFinish: boolean = false;
  constructor(private fbNominationsService: FbNominationsService) { }

  ngOnDestroy(): void {
    this.subs$.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    this.sessionId = this.fbNominationsService.getSessionId();
    let currentPosition = localStorage.getItem('currentPosition');
    if (!currentPosition) {
      currentPosition = "0";
      localStorage.setItem('currentPosition', currentPosition);
    }
    this.currentPosition = parseInt(currentPosition);

    this.bodySetup();
    this.getNominations();

  }
  getNominations() {
    const subs$ = this.fbNominationsService.getNominations().subscribe(r => {
      this.nominations = r;
      this.currentNomination = this.nominations[this.currentPosition];
    });
    this.subs$.push(subs$);
  }
  bodySetup() {
    let body = document.body;
    body.style.backgroundImage = "url(/assets/img/fondos/nominacionesfondo-blur.jpg"
    body.style.backgroundSize = "cover";
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundPosition = "center";
  }

  next() {
    this.currentPosition++;
    this.currentNomination = this.nominations[this.currentPosition];
    if(!this.currentNomination){
      this.isFinish = true;
    }
  }
  vote(participate: Participate) {
    let hasVote = false;
    this.currentNomination?.participates.forEach(e => {
      if(!hasVote){
        hasVote = this.checkIfHasVote(e);
      }
    })
    if (hasVote) {
      return;
    }
    if (participate.votes == undefined) {
      participate.votes = [];
    }
    const participateIndex = this.currentNomination?.participates.findIndex(e => e.id == participate.id) ?? 0;


    this.fbNominationsService.vote(this.currentNomination?.id, participateIndex);

  }
  checkIfHasVote(participate: Participate): boolean {
    let hasVote = false;
    if (participate.votes == undefined) {
      return hasVote;
    }
    const object = participate.votes;
    const sessionId = this.fbNominationsService.getSessionId();
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if (element == sessionId) {
          hasVote = true;
          return hasVote;
        }
      }
    }
    return hasVote;
  }
}
