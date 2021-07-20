import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { isAfter } from 'date-fns';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../data-services/user.data-service';

@Injectable({
    providedIn: 'root',
})
export class EventGuard implements CanActivate {
    constructor(
        private settingsDataService: UserDataService,
        private router: Router
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.settingsDataService.appStateV1().pipe(
            map((r) => {
                if (next.queryParams.waveplay) {
                    return true;
                }

                const eventStart = new Date(
                    r.data.event.start_at.replace(/-/g, '/')
                );
                // TODO: set server date instead of new Date()
                const isEventOpen = isAfter(new Date(), eventStart);

                if (!isEventOpen && !r.data.event.config.login.state) {
                    return this.router.parseUrl('pre-event');
                }
                return true;
            })
        );
    }
}
