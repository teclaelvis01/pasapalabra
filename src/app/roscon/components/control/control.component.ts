import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LetterI, ParticipateI, Status } from 'src/app/services/models/PasapalabraModels';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit, OnDestroy {

  participate1: ParticipateI | undefined;
  participate2: ParticipateI | undefined;
  currentParticipate: ParticipateI | undefined;
  subs$: Subscription[] = [];
  indexCurrent: number = 0;

  countdown: number = 90;
  intervalId: any;

  constructor(private firebaseService: FirebaseService) {

  }

  ngOnDestroy(): void {
    this.subs$.forEach(s => s.unsubscribe());
  }

  ngOnInit() {
    const subs1 = this.firebaseService.loadParticipate("p1").subscribe(res => {
      if (!res) {
        return;
      }
      this.participate1 = res;
      if (res.active) {
        this.currentParticipate = this.participate1;
        this.countdown = this.currentParticipate.time;
      }
    });
    const subs2 = this.firebaseService.loadParticipate("p2").subscribe(res => {
      if (!res) {
        return;
      }
      this.participate2 = res;
      if (res.active) {
        this.currentParticipate = this.participate2;
        this.countdown = this.currentParticipate.time;
      }
    });
    this.subs$.push(subs1);
    this.subs$.push(subs2);
  }

  onPlay(): void {
    if (this.intervalId) {
      this.stopTime();
      return;
    }
    this.intervalId = setInterval(() => {
      this.tick();
    }, 1000);
  }

  stopTime() {

    clearInterval(this.intervalId);
    this.intervalId = null;
  }
  onPrevious(): void {
    if (!this.currentParticipate) {
      return
    }
    // find index actual 
    let indexActual = this.currentParticipate.letters.findIndex(e => e.status == Status.Active)
    let previousIndex = 0;
    if (indexActual <= 0) {
      indexActual = 0;
      previousIndex = this.currentParticipate.letters.length - 1;
    } else {
      previousIndex = indexActual - 1;
    }
    this.currentParticipate.letters[indexActual].status = Status.Default;
    this.currentParticipate.letters[previousIndex].status = Status.Active;
    this.firebaseService.onCorrectIncorrect(this.currentParticipate);

  }
  /**
   * change participate
   */
  onChange(): void {
    const currentIsP1 = this.currentParticipate?.id == this.participate1?.id
    const id = currentIsP1 ? this.participate2?.id : this.participate1?.id;
    this.stopTime();
    this.activeParticipate(id);
    this.onPlay();

  }
  onCorrect(): void {
    this.manageResponseOkKO(Status.Correct);
  }

  onIncorrect(): void {
    this.manageResponseOkKO(Status.Incorrect);
  }
  manageResponseOkKO(status: Status) {
    if (!this.currentParticipate) {
      return
    }
    // find index actual 
    let indexActual = this.currentParticipate.letters.findIndex(e => e.status == Status.Active)
    if (indexActual < 0) {
      indexActual = this.currentParticipate.letters.findIndex(e => e.status == Status.Default)
      if (indexActual < 0) {
        alert('not found')
        return;
      }
    }


    let newIndex = this.getNextIndex(indexActual, this.currentParticipate.letters, Status.Active);
    this.currentParticipate.letters[indexActual].status = status;
    if (newIndex < this.currentParticipate.letters.length) {
      this.currentParticipate.letters[newIndex].status = Status.Active;
    }
    if (indexActual == newIndex) {
      return;
    }

    // calculate totals
    if (status == Status.Correct) {
      this.currentParticipate.words_ok += 1;
    }
    if (status == Status.Incorrect) {
      this.currentParticipate.words_ko += 1;
    }
    this.currentParticipate.words_remainder = this.currentParticipate.letters.length - (this.currentParticipate.words_ok + this.currentParticipate.words_ko);


    this.firebaseService.onCorrectIncorrect(this.currentParticipate);
  }
  private getNextIndex(indexActual: number, letters: LetterI[], status: string) {

    let searching = true;
    let completeCycle = 0;
    while (searching) {

      if (letters[indexActual] == undefined) {
        indexActual = 0;
      }
      if (letters[indexActual].status == status || completeCycle == letters.length - 1) {
        searching = false;
      }
      indexActual++;
      completeCycle++;
    }
    return indexActual;
  }
  activeParticipate(id: string = ''): void {
    if (id == 'p1') {
      this.firebaseService.activeParticipate(id, true)
      this.firebaseService.activeParticipate('p2', false)
      return;
    }
    this.firebaseService.activeParticipate(id, true)
    this.firebaseService.activeParticipate('p1', false)
  }

  onRestart(): void {
    const result = confirm("Confirma esta acción");
    if (result) {
      this.firebaseService.setupParticipates();
    }
  }

  // función que se ejecuta cada vez que se completa el intervalo de tiempo
  tick() {
    this.countdown--; // disminuye el contador en 1
    if (this.countdown >= 0) {
      // si aún quedan segundos en la cuenta regresiva, se muestra en pantalla
      console.log(this.countdown + " segundos restantes");
      if(!this.currentParticipate){
        return;
      }
      this.currentParticipate.time = this.countdown;
      this.firebaseService.onUpdateTime(this.currentParticipate);
    } else {
      // si se llegó a 0, se detiene la cuenta regresiva y se muestra un mensaje
      clearInterval(this.intervalId);
      console.log("Cuenta regresiva finalizada!");
    }
  }


}
