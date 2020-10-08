import { Injectable } from '@angular/core';
import { Observable, ConnectableObservable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CordovaService {
  deviceReady: Observable<Event>;
  deviceResume: Observable<Event>;
  networkOffline: Observable<Event>;
  networkOnline: Observable<Event>;

  constructor() {
      this.deviceReady = Observable.fromEvent(document, 'deviceready').publishReplay(1);
      (this.deviceReady as ConnectableObservable<Event>).connect();

      this.deviceResume = Observable.fromEvent(document, 'resume').publishReplay(1);
      (this.deviceResume as ConnectableObservable<Event>).connect();

      this.networkOffline = Observable.fromEvent(document, 'offline').publishReplay(1);
      (this.networkOffline as ConnectableObservable<Event>).connect();

      this.networkOnline = Observable.fromEvent(document, 'online').publishReplay(1);
      (this.networkOnline as ConnectableObservable<Event>).connect();
  }

}
