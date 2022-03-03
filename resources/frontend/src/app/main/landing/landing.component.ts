import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil, withLatestFrom } from 'rxjs/operators';
import { UiService } from 'src/app/core/services/ui.service';

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, OnDestroy {
    onDestroy$ = new Subject();

    constructor(
        private uiService: UiService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.initEventState();
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    initEventState(): void {
        this.uiService
            .getEventState$()
            .pipe(
                distinctUntilChanged(),
                withLatestFrom(this.route.queryParams),
                takeUntil(this.onDestroy$)
            )
            .subscribe(([state, queryParams]) => {
                if (queryParams) {
                    if (queryParams.waveplay) {
                        return;
                    } else {
                        if (!state) {
                            this.router.navigate(['pre-event']);
                        }
                    }
                }
            });
    }

}
