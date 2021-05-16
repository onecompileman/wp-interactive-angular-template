import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { isAfter } from 'date-fns';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { interval, Subscription } from 'rxjs';
import { UserDataService } from 'src/app/core/data-services/user.data-service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { environment } from 'src/environments/environment';

declare const countdown;

@Component({
    selector: 'tvf-pre-event',
    templateUrl: './pre-event.component.html',
    styleUrls: ['./pre-event.component.scss'],
})
export class PreEventComponent implements OnInit, AfterViewInit, OnDestroy {

    eventStartDate: Date;
    isEventOpen: boolean;

    tidioSub: Subscription;

    constructor(
        private tidioService: TidioService,
        private userDataService: UserDataService
    ) {}

    ngOnInit(): void {
        this.initWebsocket();
    }

    ngAfterViewInit(): void {
        this.tidioSub = interval(1000)
            .subscribe(() => {
                this.tidioService.hideTidio();
            });
    }

    ngOnDestroy(): void {
        this.tidioSub.unsubscribe();
    }

    initWebsocket(): void {
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
            if (e.payload.target == 'event.start_at') {
                this.getAppSettings();
            }
          });
    }

    private getAppSettings() {
        this.userDataService.appStateV1().subscribe((r) => {
            this.eventStartDate = new Date(
                r.data.event.start_at.replace(/-/g, '/')
            );
            this.isEventOpen = isAfter(new Date(), this.eventStartDate);

            if (r.data.event.config.login.state) {
                // TODO: Navigate to landing/login page
            }
            this.countdownToEvent();
        });
    }

    private countdownToEvent() {
        // TODO: Implement fn
    }
}
