import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { UserDataService } from 'src/app/core/data-services/user.data-service';
import { TidioService } from 'src/app/core/services/tidio.service';
import { UiService } from 'src/app/core/services/ui.service';

declare const countdown;

@Component({
    selector: 'tvf-pre-event',
    templateUrl: './pre-event.component.html',
    styleUrls: ['./pre-event.component.scss'],
})
export class PreEventComponent implements OnInit, AfterViewInit, OnDestroy {
    eventStartDate$: Observable<Date>;
    eventStartDate: Date;

    tidioSub: Subscription;
    onDestroy$ = new Subject();

    constructor(
        private tidioService: TidioService,
        private userDataService: UserDataService,
        private uiService: UiService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAppSettings();
        this.listenToLoginState();
        this.eventStartDate$ = this.uiService.getEventDateState$();
    }

    ngAfterViewInit(): void {
        this.tidioSub = interval(1000)
            .subscribe(() => {
                this.tidioService.hideTidio();
            });
    }

    ngOnDestroy(): void {
        this.tidioSub.unsubscribe();
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    private getAppSettings() {
        this.uiService.getEventDateState$()
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(date => {
                this.eventStartDate = date;
                this.countdownToEvent();
            })
    }

    private countdownToEvent() {
        // TODO: Implement fn
    }

    private listenToLoginState(): void {
        this.uiService
            .getEventState$()
            .pipe(distinctUntilChanged(), takeUntil(this.onDestroy$))
            .subscribe((state) => {
                if (state) {
                    // TODO: set landing route
                    this.router.navigate(['']);
                }
            });
    }
}
