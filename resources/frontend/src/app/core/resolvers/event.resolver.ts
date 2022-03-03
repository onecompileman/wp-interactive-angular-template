import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
    providedIn: 'root',
})
export class EventResolver implements Resolve<any> {

    constructor(
        private websocketService: WebsocketService,
        private settingsService: SettingsService
    ) {}

    resolve(): Observable<any> {
        this.websocketService.initPublicWebsocket();
        return this.settingsService.requestV1AppSettings$().pipe(take(1));
    }
}
