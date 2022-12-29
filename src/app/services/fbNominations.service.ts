import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { convertSnaps, convertSnapsValue, convertSnapsValueObject } from './db-utils';
import { Nomination, Nominations } from './models/Nominations.model';
import { v4 as uuid } from 'uuid';



@Injectable({
  providedIn: 'root'
})
export class FbNominationsService {

  collectionName = "nominations";
  constructor(
    private db: AngularFireDatabase,
  ) {
    // this.setupNominations()
    this.setupSession();
  }

  setupNominations() {
    let award = new Nominations();
    this.db.object('nominations').update(award.getNominations());
  }

  getSessionId() {
    let session = localStorage.getItem('n_s');
    if (!session) {
      session = this.setupSession();
    }
    return session;
  }

  setupSession() {
    let session = localStorage.getItem('n_s');
    if (!session) {
      session = uuid();
      localStorage.setItem('n_s', session)
    }
    return session;
  }
  getNominations(): Observable<Nomination[]> {
    return this.db.object(this.collectionName)
      .valueChanges()
      .pipe(
        map(res => {
        const nominations = convertSnapsValueObject<Nomination>(res);
        return nominations;
      }));
  }
  // getNominationVotes(nominationId:string | undefined): Observable<any> {
  //   return this.afs.collection(this.collectionName).doc(nominationId).collection('votes')
  //     .get()
  //     .pipe(
  //       map(res => {
  //         console.log('nsdd',res.docs)
  //       // const nominations = convertSnapsValue<Nomination>(res);
  //       // return nominations;
  //     }));
  // }
  vote(nominationId: string = 'vote-error',participateIndex:number) {
    const source = `${this.collectionName}/${nominationId}/participates/${participateIndex}/votes`;
    this.db.list(source).push(this.getSessionId());
  }

}
