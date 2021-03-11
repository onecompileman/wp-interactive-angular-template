import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class BoothDataService {

    constructor(
        private restangular: Restangular
    ) {}

    getAll(): Observable<any> {
        return this.restangular
            .one('api')
            .one('v2')
            .one('brand')
            .one('booths')
            .get();
    }
}