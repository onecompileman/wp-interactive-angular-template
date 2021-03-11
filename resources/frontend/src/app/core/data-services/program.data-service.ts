import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ProgramDataService {
    constructor(private restangular: Restangular) {}

    getAll(): Observable<any[]> {
        return this.restangular
            .all('api')
            .all('v2')
            .one('event', 1)
            .one('programs')
            .get({
                grouped: false
            })
            .pipe(
                map((res: any) => {
                    console.log(res);
                    return res.data;
                })
            );
    }
}
