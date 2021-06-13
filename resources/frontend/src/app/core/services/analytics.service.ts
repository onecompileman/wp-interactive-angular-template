import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    pushGA(category, action) {
        const prefix = environment.appPrefix;

        window['dataLayer'] = window['dataLayer'] || [];
        window['dataLayer'].push({
            event: 'genericEvent',
            category: category,
            action: action,
            label: localStorage.getItem(`${prefix}.user-id`),
        });
    }

    clickEvent(subject: string): void {
        if (!!window['clientEvent']) {
            window['clientEvent'](window['currentLocation'], `click ${subject}`);
            this.pushGA('click', `${subject}`);            
        }
    }
}
