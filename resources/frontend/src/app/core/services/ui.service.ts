import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  liveUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  liveUpdateMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  livestreamAvailabilitySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  lobbyAvailabilitySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  lobbyBgmSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  setLivestreamAvailability(state: boolean): void {
    this.livestreamAvailabilitySubject.next(state);
  }

  getLivestreamAvailability$(): Observable<boolean> {
    return this.livestreamAvailabilitySubject.asObservable();
  }

  getLivestreamAvailability(): boolean {
    return this.livestreamAvailabilitySubject.getValue();
  }

  setLobbyAvailability(state: boolean): void {
    this.lobbyAvailabilitySubject.next(state);
  }

  getLobbyAvailability$(): Observable<boolean> {
    return this.lobbyAvailabilitySubject.asObservable();
  }

  getLobbyAvailability(): boolean {
    return this.lobbyAvailabilitySubject.getValue();
  }

  setLobbyBgmState(state: boolean): void {
    this.lobbyBgmSubject.next(state);
  }

  getLobbyBgmState$(): Observable<boolean> {
    return this.lobbyBgmSubject.asObservable();
  }

  getLobbyBgmState(): boolean {
    return this.lobbyBgmSubject.getValue();
  }

}
