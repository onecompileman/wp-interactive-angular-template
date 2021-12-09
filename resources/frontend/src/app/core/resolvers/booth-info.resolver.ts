import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { find } from 'lodash';
import { BoothQuery } from '../states/booth/booth.query';
import { BoothStore } from '../states/booth/booth.store';


@Injectable({
  providedIn: 'root'
})
export class BoothInfoResolver implements Resolve<any> {

    constructor(
      private boothQuery: BoothQuery,
      private boothStore: BoothStore
    ) { }

    resolve(route: ActivatedRouteSnapshot): Observable<any> {
      return new Observable(obs => {
        const booths = this.boothQuery.getAll();
        const activeBooth = find(booths, { 'id': +route.paramMap.get('id') });
        this.boothStore.setActive(activeBooth.id);
        obs.next();
        obs.complete();
      })
    }
}
