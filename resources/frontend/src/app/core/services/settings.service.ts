import { Injectable } from '@angular/core';
import { isAfter } from 'date-fns';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Settings } from '../../shared/models/settings.model';
import { UserDataService } from '../data-services/user.data-service';
import { PushNotificationService } from './push-notification.service';
import { UiService } from './ui.service';

@Injectable({ providedIn: 'root' })
export class SettingsService {
    private settings: BehaviorSubject<Settings> = new BehaviorSubject<Settings>(null);
    private settingsV1: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        private userDataService: UserDataService,
        private uiService: UiService,
        private pushNotifService: PushNotificationService
    ) {}

    getAppSettings$(options?: { skipUpdatingStore: boolean }): Observable<any> {
        return this.userDataService.appState().pipe(
            take(1),
            map((res) => res.data.event),
            tap((settings) => {
                this.settings.next(settings);

                if (!!options && options.skipUpdatingStore) {
                    return;
                }
                // LOBBY STATE
                this.uiService.setLobbyAvailability(
                    settings.config.lobby.state
                );

                this.uiService.setProgramState({
                    ...settings.program,
                    start_at: (settings.program.start_at || '').replace(
                        /-/g,
                        '/'
                    ),
                });

                // LOBBY BGM STATE
                this.uiService.setLobbyBgmState(
                    settings.config.bgm ? settings.config.bgm.state : true
                );

                const isLivestreamOpen = settings.config.auditorium.state;
                const isLivestreamEnded = settings.config['auditorium-end'].state;

                // LIVESTREAM
                this.uiService.setLivestreamState(isLivestreamOpen);

                // LIVESTREAM END
                this.uiService.setLivestreamEndState(isLivestreamEnded);

                // LIVESTREAM REMINDER
                const livstreamReminder = settings.config['auditorium-10min'].state;
                this.uiService.setLivestreamReminderState(livstreamReminder);

                // EMOJI
                const isEmojiEnabled = settings.config['emoji'].state;
                this.uiService.setEmojiState(isEmojiEnabled);

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

    updateProgramDate(): void {
        this.userDataService
            .appState()
            .pipe(
                take(1),
                map((res) => res.data.event)
            )
            .subscribe((settings) => {
                this.uiService.setProgramState({
                    ...settings.program,
                    start_at: (settings.program.start_at || '').replace(
                        /-/g,
                        '/'
                    ),
                });
            });
    }

    getSettingsSnapshot(): any {
        return this.settings.getValue();
    }


    requestV1AppSettings$(): Observable<any> {
        return this.userDataService.appStateV1().pipe(
            map((res) => res.data.event),
            take(1),
            tap((settings) => {
                this.settingsV1.next(settings);
                this.initEventState$(settings);
            })
        );
    }

    initEventState$(settings: any): void {
        const eventStartDate = new Date(settings.start_at.replace(/-/g, '/'));
        // TODO: set server date
        const isEventOpenByDate = isAfter(new Date(), eventStartDate);
        const isEventOpen = isEventOpenByDate || settings.config.login.state;
        this.uiService.setEventState(isEventOpen);
        this.uiService.setEventDateState(eventStartDate);
    }

    getV1AppSettings$(): Observable<any> {
        return this.settingsV1.asObservable();
    }

    getV1AppSettingsSnapshot(): any {
        return this.settingsV1.getValue();
    }
}
