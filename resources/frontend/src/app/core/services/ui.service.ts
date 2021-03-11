import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  liveUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  liveUpdateMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  setLiveUpdateState(showLiveUpdate: boolean): void {
    this.liveUpdateSubject.next(showLiveUpdate);
  }

  getLiveUpdateState$(): Observable<boolean> {
    return this.liveUpdateSubject.asObservable();
  }

  setLiveUpdateMessageState(liveUpdateMessage: string): void {
    this.liveUpdateMessageSubject.next(liveUpdateMessage);
  }

  getLiveUpdateMessageState$(): Observable<string> {
    return this.liveUpdateMessageSubject.asObservable();
  }

}
