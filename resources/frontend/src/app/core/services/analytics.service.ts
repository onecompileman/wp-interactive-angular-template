import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    pushGA(category, action) {
        // TODO: set localStorage app prefix
        window['dataLayer'] = window['dataLayer'] || [];
        window['dataLayer'].push({
            event: 'genericEvent',
            category: category,
            action: action,
            label: localStorage.getItem('app.user-id'),
        });
    }

    clickEvent(subject: string): void {
        window['clientEvent'](window['currentLocation'], `click ${subject}`);
        this.pushGA('click', `${subject}`);
    }
}
