import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    constructor(private restangular: Restangular) {}

    register(userInfo: any): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('register')
            .post(userInfo);
    }

    checkEmailAvailability(email: string): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('email')
            .all('quick')
            .all('validation')
            .post({
                email
            });
    }

    checkMobileNumberAvailability(mobile_number: string): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('mobile-number')
            .all('quick')
            .all('validation')
            .post({
                mobile_number
            });
    }

    login(login_code: string): Observable<any> {
        return this.restangular
            .all('guest')
            .all('auth')
            .post({
                login_code
            });
    }

    logout(): Observable<any> {
        return this.restangular.one('guest/logout').get();
    }

    loginForce(login_code: string): Observable<any> {
        return this.restangular
            .all('guest')
            .all('auth')
            .all('force')
            .post({
                login_code
            });
    }

    update(user: any): Observable<any> {
        return this.restangular
            .all('api')
            .all('v2')
            .all('guest')
            .all('update')
            .post(user);
    }

    requestResetPassword(email: string): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('auth')
            .all('reset')
            .all('forgot-password')
            .post({
                email
            });
    }

    registerName(name: string): Observable<any> {
        const login_code = localStorage.getItem('globe.login-code');

        return this.restangular
            .all('api')
            .all('v2')
            .all('guest')
            .all('name')
            .all('create')
            .post({
                name,
                login_code
            });
    }

    validateResetToken(token: string): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('auth')
            .all('reset')
            .all('validate')
            .post({
                token
            });
    }

    resetPassword(resetPassword: any): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .all('guest')
            .all('auth')
            .all('reset')
            .all('password')
            .post(resetPassword);
    }

    getProfile(): Observable<any> {
        return this.restangular
            .all('api')
            .all('v2')
            .all('guest')
            .all('profile')
            .one('settings')
            .get();
    }

    checkLoginState(): Observable<any> {
        return this.restangular.one('guest/auth/check').get();
    }

    appState(): Observable<any> {
        return this.restangular
            .all('api')
            .all('v2')
            .one('event', 1)
            .one('settings')
            .get();
    }

    appStateV1(): Observable<any> {
        return this.restangular
            .all('api')
            .all('v1')
            .one('event', 1)
            .one('settings')
            .get();
    }
}
