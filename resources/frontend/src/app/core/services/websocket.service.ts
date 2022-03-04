import { Injectable } from '@angular/core';
import { isAfter } from 'date-fns';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { noop } from 'rxjs';
import { WebsocketChannels } from 'src/app/shared/enums/websocket-channels.enum';
import { environment } from 'src/environments/environment';
import { AnalyticsDataService } from '../data-services/analytics-data.service';
import { PushNotificationService } from './push-notification.service';
import { SettingsService } from './settings.service';
import { UiService } from './ui.service';


@Injectable({ providedIn: 'root' })
export class WebsocketService {
    eventCallback: Function = (e) => { };

    constructor(
        private analyticsDataService: AnalyticsDataService,
        private uiService: UiService,
        private pushNotifService: PushNotificationService,
        private settingsService: SettingsService
    ) { }

    initWebsocket() {
        if (!window['changeLocation']) {
            window['Pusher'] = Pusher;
            window['Echo'] = new Echo({
                broadcaster: 'pusher',
                key: environment.pusher.key,
                cluster: environment.pusher.cluster,
                wsHost: environment.pusher.host,
                wsPort: environment.pusher.port,
                wssPort: environment.pusher.port,
                disableStats: true,
                encrypted: false,
                auth: {
                    headers: {
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf"]')
                            .getAttribute('content'),
                    },
                },
            });

            const appPrefix = environment.appPrefix;

            window['currentLocation'] = 'loading';
              let cname = 'U' + btoa(localStorage.getItem(`${appPrefix}.user-id`).padStart(5));
              window['Echo'].private(cname);
            // let cname = 'TEST';
            // window['Echo'].channel(cname);

            window['changeLocation'] = (location, channel) => {
                if (channel != window['currentChannel'] && channel) {
                      let previousChannel = `private-${window['currentChannel']}`;
                    // let previousChannel = window['currentChannel'];
                    window['currentChannel'] = channel;
                    window['Echo'].leave(previousChannel);
                      window['Echo'].private(channel).listen('SystemEvent', this.eventCallback);
                    // window['Echo'].channel(channel).listen('SystemEvent', this.eventCallback);
                }
                window['currentLocation'] = location;
                // window['clientEvent'](location);
                // window['clientVisit']();
            }

            window['clientPing'] = () => {
                let wsSuccess = false;
                wsSuccess = window['Echo'].connector.pusher.channels.channels[
                      `private-${cname}`
                    // `${cname}`
                ].trigger('client-ping', {
                    U: localStorage.getItem(`${appPrefix}.user-id`),
                    L: window['currentLocation'],
                });
                if (!wsSuccess) {
                    this.analyticsDataService.pushActivity({
                        L: window['currentLocation'],
                        _token: document
                            .querySelector('meta[name="csrf"]')
                            .getAttribute('content'),
                    });
                }
            };

            setInterval(() => {
                window['clientPing']();
            }, 60000 / 3); // original -> 180000

            window['clientVisit'] = (visit_location = false) => {
                let visit = window['currentLocation'];
                if (visit_location) {
                    visit = visit_location;
                }
                let wsSuccess = false;
                wsSuccess = window['Echo'].connector.pusher.channels.channels[
                      `private-${cname}`
                    // `${cname}`
                ].trigger('client-visit', {
                    U: localStorage.getItem(`${appPrefix}.user-id`),
                    L: visit,
                });
                if (!wsSuccess) {
                    this.analyticsDataService.pushActivity({
                        L: visit,
                        _token: document
                            .querySelector('meta[name="csrf"]')
                            .getAttribute('content'),
                    });
                }
            };

            window['clientEvent'] = (category, action) => {
                let wsSuccess = false;
                wsSuccess = window['Echo'].connector.pusher.channels.channels[
                      `private-${cname}`
                    // `${cname}`
                ].trigger('client-event', {
                    U: localStorage.getItem(`${appPrefix}.user-id`),
                    L: category,
                    A: action,
                });
                if (!wsSuccess) {
                    this.analyticsDataService
                        .pushEvent({
                            L: category,
                            A: action,
                            _token: document
                                .querySelector('meta[name="csrf"]')
                                .getAttribute('content'),
                        })
                        .subscribe((e) => {
                            // console.log(e);
                        });
                }
            };
        }
    }

    initPublicWebsocket(): void {
        if (!window['public-websocket']) {
            window['Pusher'] = Pusher;
            window['Echo'] = new Echo({
                broadcaster: 'pusher',
                key: environment.pusher.key,
                cluster: environment.pusher.cluster,
                wsHost: environment.pusher.host,
                wsPort: environment.pusher.port,
                wssPort: environment.pusher.port,
                disableStats: true,
                encrypted: false,
                auth: {
                    headers: {
                        'X-CSRF-TOKEN': document
                            .querySelector('meta[name="csrf"]')
                            .getAttribute('content'),
                    },
                },
            });

            window['Echo']
                .channel('V2F2ZXBsYXlQdWJsaWM=')
                .listen('WaveplayEvent', (e) => {
                    const target = e.payload.target;
                    const snapshot = this.settingsService.getV1AppSettingsSnapshot();

                    if (target === 'event.start_at') {
                        const eventStartDate = new Date(
                            e.payload.start_at.replace(/-/g, '/')
                        );
                        // TODO: set server date
                        const isEventOpenByDate = isAfter(new Date(), eventStartDate);
                        const isEventOpen = snapshot.config.loginState || isEventOpenByDate;

                        this.uiService.setEventState(isEventOpen);
                        this.uiService.setEventDateState(eventStartDate);

                    } else if (target === 'login') {
                        const eventStartDate = new Date(
                            snapshot.start_at.replace(/-/g, '/')
                        );
                        // TODO: set server date
                        const isEventOpenByDate = isAfter(new Date(), eventStartDate);
                        const isEventOpen =
                            e.payload.state || isEventOpenByDate;
                        this.uiService.setEventState(isEventOpen);
                    }
                });

            window['public-websocket'] = true;
        }
    }

    changeLocation(location: string, channel?: string): void {
        if (!!channel) {
            this.setEventCallback(channel);
            window['changeLocation'](location, channel);
        } else {
            window['changeLocation'](location);
        }

        if (window['clientPing']) {
            window['clientPing']();
        }
    }

    setEventCallback(channel: string): void {
        switch (channel) {
            case WebsocketChannels.LOBBY:
                this.setLobbyEventCallback();
                return;
            case WebsocketChannels.LIVESTREAM:
                this.setLivestreamEventCallback();
                return;
        }
    }

    setLobbyEventCallback(): void {
        this.eventCallback = e => {
            switch (e.payload.target) {
                case 'auditorium':
                    this.uiService.setLivestreamState(e.payload.state);
                    break;
                case 'auditorium-end':
                    this.uiService.setLivestreamEndState(e.payload.state);
                    break;
                case 'auditorium-10min':
                    this.uiService.setLivestreamReminderState(e.payload.state);
                    break;
                case 'lobby':
                    this.uiService.setLobbyState(e.payload.state);
                    break;
                case 'bgm':
                    this.uiService.setLobbyBgmState(e.payload.state);
                    break;
                case 'program-update':
                    this.settingsService.updateProgramDate();
                    break;
                case 'modal':
                    if (e.payload.action === 'show') {
                        this.pushNotifService.setData(e.payload);
                    }
                    this.pushNotifService.toggle(e.payload.action === 'show');
                    break;
                default: noop();
                    break;
            }
        };
    }

    setLivestreamEventCallback(): void {
        this.eventCallback = e => {
            switch (e.payload.target) {
                case 'emoji':
                    this.uiService.setEmojiState(e.payload.state);
                    break;
                case 'auditorium-end':
                    this.uiService.setLivestreamEndState(e.payload.state);
                    break;
                default: noop();
                    break;
            }
        };
    }
}
