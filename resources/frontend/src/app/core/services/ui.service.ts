import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class UiService {
    liveUpdateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    liveUpdateMessageSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
        ''
    );
    lobbyAvailabilitySubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    lobbyBgmSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    emojiSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false
    );
    programSubject: BehaviorSubject<any> = new BehaviorSubject(null);
    livestreamStateSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    livestreamEndStateSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    livestreamReminderStateSubj: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    isActualEventDay: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isEventOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);
    isEventDateSubject: BehaviorSubject<Date> = new BehaviorSubject(null);

    constructor() { }

    setLivestreamState(state: boolean): void {
        this.livestreamStateSubject.next(state);
    }

    getLivestreamState$(): Observable<boolean> {
        return this.livestreamStateSubject.asObservable();
    }

    getLivestreamState(): boolean {
        return this.livestreamStateSubject.getValue();
    }

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

    // EMOJI
    setEmojiState(state: boolean): void {
        this.emojiSubject.next(state);
    }

    getEmojiState$(): Observable<boolean> {
        return this.emojiSubject.asObservable();
    }

    getEmojiState(): boolean {
        return this.emojiSubject.getValue();
    }

    // Program
    setProgramState(program): void {
        this.programSubject.next(program);
    }

    getProgramState(): any {
        return this.programSubject.getValue();
    }

    getProgramState$(): Observable<any> {
        return this.programSubject.asObservable();
    }

    // LIVESTREAM END STATE
    setLivestreamEndState(state: boolean): void {
        this.livestreamEndStateSubj.next(state);
    }

    getLivestreamEndState$(): Observable<boolean> {
        return this.livestreamEndStateSubj.asObservable();
    }

    getLivestreamEndState(): boolean {
        return this.livestreamEndStateSubj.getValue();
    }

    // LIVESTREAM REMINDER STATE
    setLivestreamReminderState(state: boolean): void {
        this.livestreamReminderStateSubj.next(state);
    }

    getLivestreamReminderState$(): Observable<boolean> {
        return this.livestreamReminderStateSubj.asObservable();
    }

    getLivestreamReminderState(): boolean {
        return this.livestreamReminderStateSubj.getValue();
    }

    // EVENT SCHED
    setisActualEventDayState(state: boolean): void {
        this.isActualEventDay.next(state);
    }

    getisActualEventDayState$(): Observable<boolean> {
        return this.isActualEventDay.asObservable();
    }

    getisActualEventDayState(): boolean {
        return this.isActualEventDay.getValue();
    }

    // EVENT STATE
    setEventState(state: boolean): void {
        this.isEventOpenSubject.next(state);
    }

    getEventState$(): Observable<boolean> {
        return this.isEventOpenSubject.asObservable();
    }

    getEventState(): boolean {
        return this.isEventOpenSubject.getValue();
    }

    // EVENT DATE STATE
    setEventDateState(state: Date): void {
        this.isEventDateSubject.next(state);
    }

    getEventDateState$(): Observable<Date> {
        return this.isEventDateSubject.asObservable();
    }

    getEventDateState(): Date {
        return this.isEventDateSubject.getValue();
    }
}
