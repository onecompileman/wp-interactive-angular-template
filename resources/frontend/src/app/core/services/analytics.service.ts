import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class AnalyticsService {
    pushGA(category, action) {
        window['dataLayer'] = window['dataLayer'] || [];
        window['dataLayer'].push({
            event: 'genericEvent',
            category: category,
            action: action,
            label: localStorage.getItem('globe.user-id'),
        });
    }
}
