import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isAfter } from 'date-fns';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class LivestreamGuard implements CanActivate {

    constructor(
        private settingsService: SettingsService,
        private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.settingsService.getAppSettings$({skipUpdatingStore: true})
        .pipe(
            take(1),
            map(settings => {
                const isOpen = settings.config.auditorium.state;
                // TODO: use server date
                const isScheduleOpen = isAfter(new Date(), new Date(settings.program.start_at));
                if (isOpen || isScheduleOpen) {
                    return true;
                }
                return this.router.parseUrl('lobby/home');
            })
        );
  }

}
