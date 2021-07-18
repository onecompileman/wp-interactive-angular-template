import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot, CanActivate,
    Router, RouterStateSnapshot,
    UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {

        if (localStorage.getItem(`${environment.appPrefix}.user-id`)) {
            return true;
        }

        // TODO: redirect to home page
        return this.router.parseUrl('tv5');
    }
}
