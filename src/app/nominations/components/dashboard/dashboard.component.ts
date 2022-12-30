import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FbNominationsService } from 'src/app/services/fbNominations.service';
import { Nomination, SetupNomination, StatusI, StatusIClosed, StatusIOpen } from 'src/app/services/models/Nominations.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  nominations: Nomination[] = [];
  subs$: Subscription[] = [];
  setup:SetupNomination | undefined;
  statusOpen = StatusIOpen;
  statusClosed = StatusIClosed;
  
  constructor(
    private fbNominationsService: FbNominationsService,) { }

  ngOnInit() {
    this.getSetup();
    this.getNominations();
  }
  getSetup() {
    this.fbNominationsService.getSetup().subscribe(res=>this.setup = res)
  }
  ngOnDestroy(): void {
    this.subs$.forEach(s => s.unsubscribe());
  }
  getNominations() {
    const subs$ = this.fbNominationsService.getNominations().subscribe(r => {
      this.nominations = r.map(e => {
        e.participates.map(p => {
          if (!p.votes) {
            p.votes = [];
          } else if (p.votes) {
            const object = p.votes;
            p.votes = [];
            for (const key in object) {
              if (Object.prototype.hasOwnProperty.call(object, key)) {
                p.votes.push(key);
              }
            }
          }
          return p;
        })
        return e;
      });
    });
    this.subs$.push(subs$);
  }

  onOpen(){
    this.fbNominationsService.openVotes();
  }
  onClose(){
    this.fbNominationsService.closeVotes();
  }
  onRestart(){
    this.fbNominationsService.setupNominations();
  }

}
