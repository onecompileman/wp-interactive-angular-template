import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AnalyticsDataService {

  constructor(private restangular: Restangular) {
  }

  pushActivity(activity: any): Observable<any> {
    return this.restangular.all('api/v2/analytic/push/activity').post(activity);
  }

  pushEvent(event: any): Observable<any> {
    return this.restangular.all('api/v2/analytic/push/event').post(event);
  }
}
