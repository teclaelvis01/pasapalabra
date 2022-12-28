import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap, take, switchMap, mergeMap, expand, takeWhile } from 'rxjs/operators';
import { convertSnap, convertSnaps } from './db-utils';
import { Letter, LetterBuild, LetterI, Participate, ParticipateI } from './models/PasapalabraModels';

@Injectable({
  providedIn: 'root',

})
export class FirebaseService {
  
  collectionName = "pasapalabras";
  constructor(
    private afs: AngularFirestore,
  ) {
    // this.setupParticipates()
  }

  setupParticipates() {
    const participate1 = new Participate("p1");
    const participate2 = new Participate("p2");
    participate2.timeClass = 'orange';

    this.afs.collection(this.collectionName).doc(participate1.id).set(JSON.parse(JSON.stringify(participate1)));
    this.afs.collection(this.collectionName).doc(participate2.id).set(JSON.parse(JSON.stringify(participate2)));
  }

  // setupWords(participation:string = "p1") {
  //   const letters = this.letterBuild.getLetters();
  //   // this.afs.doc('/letters').delete();
  //   letters.forEach(l => {
  //     this.afs.doc(`${participation}/letters/${l.position}`).set(JSON.parse(JSON.stringify(l)));
  //   })
  // }
  loadData(): Observable<any> {
    return this.afs.doc('/config').valueChanges();
  }
  loadLetters(): Observable<LetterI[]> {
    let letters: LetterI[] = [];
    return this.afs.collection('/letters', ref => ref.orderBy('position'))
      .valueChanges()
      .pipe(map((res: Array<any>) => {
        res.forEach(d => {
          const letter = new Letter(d['text'], d['status'], d['position']);
          letters.push(letter);
        });
        return letters;
      }));
  }

  loadActiveParticipate(): Observable<ParticipateI | null> {
    return this.afs.collection(this.collectionName, ref => ref.where("active", "==", true))
      .get()
      .pipe(
        map(result => {
          const participate = convertSnaps<ParticipateI>(result);
          return participate.length == 1 ? participate[0] : null;
        })
      );

  }
  loadParticipate(id: string): Observable<ParticipateI | null> {
    return this.afs.doc(`${this.collectionName}/${id}`)
      .snapshotChanges()
      .pipe(
        map(result => {
          const participate = convertSnap<ParticipateI>(result.payload);
          return participate ? participate : null;
        })
      )

  }

  activeParticipate(id:string,active:boolean = true){
    this.afs.doc(`${this.collectionName}/${id}`).update({active:active});
  }
  
  onCorrectIncorrect(participate: ParticipateI) {
    this.afs.doc(`${this.collectionName}/${participate.id}/`).update(participate);
  }
  onUpdateTime(participate: ParticipateI) {
    this.afs.doc(`${this.collectionName}/${participate.id}/`).update({time:participate.time});
  }



}
