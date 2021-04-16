import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { PushNotificationService } from './push-notification.service';
import { UiService } from './ui.service';
import { UserDataService } from '../data-services/user.data-service';
import { Settings } from '../../shared/models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(null);

    constructor(
        private userDataService: UserDataService,
        private uiService: UiService,
        private pushNotifService: PushNotificationService
    ) {}

    getAppSettings(): Observable<any> {
        return this.userDataService.appState().pipe(
            take(1),
            map((res) => res.data.event),
            tap((settings) => {
                this.settings.next(settings);

                // LOBBY STATE
                this.uiService.setLobbyAvailability(
                    settings.config.lobby.state
                );

                // LOBBY BGM STATE
                this.uiService.setLobbyBgmState(
                    settings.config.bgm ? settings.config.bgm.state : true
                );

                // LIVESTREAM
                const isLivestreamOpen = settings.config.auditorium.state;
                this.uiService.setLivestreamAvailability(isLivestreamOpen);

                // MESSAGES
                if (
                    Boolean(settings.config.messages) &&
                    Boolean(settings.config.messages['lobby'])
                ) {
                    if (
                        settings.config.messages['lobby']['modal'].action ===
                        'show'
                    ) {
                        this.pushNotifService.setData(
                            settings.config.messages['lobby']['modal']
                        );
                    }
                    this.pushNotifService.toggle(
                        settings.config.messages['lobby']['modal'].action ===
                            'show'
                    );
                }
            })
        );
    }

    getProgramDate$(): Observable<string> {
        return this.settings
            .asObservable()
            .pipe(map((settings) => settings.program.start_at));
    }
}
