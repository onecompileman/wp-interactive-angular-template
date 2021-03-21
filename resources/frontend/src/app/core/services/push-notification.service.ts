import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PushNotificationData {
  message?: string;
  button?: string;
  redirectUrl?: string;
  group?: string;
}

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private data: BehaviorSubject<PushNotificationData> = new BehaviorSubject<
    PushNotificationData
  >(null);
  private open: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  toggle(open: boolean): void {
    this.open.next(open);
  }

  getState$(): Observable<boolean> {
    return this.open.asObservable();
  }

  setData(data: any): void {
    const pushData = this.mapToFormat(data);
    this.data.next(pushData);
  }

  getData$(): Observable<PushNotificationData> {
    return this.data.asObservable();
  }

  getData(): PushNotificationData {
    return this.data.getValue();
  }

  private mapToFormat(payload: any): PushNotificationData {
    return {
      message: payload.message,
      button: payload.button,
      redirectUrl: payload.url,
      group: payload.group
    } as PushNotificationData;
  }
}
