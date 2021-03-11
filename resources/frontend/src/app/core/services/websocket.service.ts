import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { AnalyticsDataService } from './analytics-data.service';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  eventCallback: Function = (e) => {};

  constructor(private analyticsDataService: AnalyticsDataService) {
  }

  initWebsocket() {
    if (!window['changeLocation']) {
      window['Pusher'] = Pusher;
      window['Echo'] = new Echo({
        broadcaster: 'pusher',
        key: environment.pusher.key,
        cluster: environment.pusher.cluster,
        wsHost: environment.pusher.host,
        wsPort: environment.pusher.port,
        wssPort: environment.pusher.port,
        disableStats: true,
        encrypted: false,
        auth: {
          headers: {
            'X-CSRF-TOKEN': document
              .querySelector('meta[name="csrf"]')
              .getAttribute('content'),
          },
        },
      });

      window['currentLocation'] = 'loading';
      // let cname = 'U' + btoa(localStorage.getItem('globe.user-id').padStart(5));
      // window['Echo'].private(cname);
      let cname = 'TEST';
      window['Echo'].channel(cname);

      window['changeLocation'] = (location, channel) => {
          if (channel != window['currentChannel'] && channel){
              // let previousChannel = `private-${window['currentChannel']}`;
              let previousChannel = window['currentChannel'];
              window['currentChannel'] = channel;
              window['Echo'].leave(previousChannel);
              // window['Echo'].private(channel).listen('SystemEvent', this.eventCallback);
              window['Echo'].channel(channel).listen('SystemEvent', this.eventCallback);
          }
          window['currentLocation'] = location;
          // window['clientEvent'](location);
          // window['clientVisit']();
      }

      // window['clientPing'] = () => {
      //   let wsSuccess = false;
      //   wsSuccess = window['Echo'].connector.pusher.channels.channels[
      //     `private-${cname}`
      //     // `${cname}`
      //   ].trigger('client-ping', {
      //     U: localStorage.getItem('globe.user-id'),
      //     L: window['currentLocation'],
      //   });
      //   if (!wsSuccess) {
      //     this.analyticsDataService.pushActivity({
      //       L: window['currentLocation'],
      //       _token: document
      //         .querySelector('meta[name="csrf"]')
      //         .getAttribute('content'),
      //     });
      //   }
      // };

      // setInterval(() => {
      //   window['clientPing']();
      // }, 60000 / 3); // original -> 180000

      // window['clientVisit'] = (visit_location = false) => {
      //   let visit = window['currentLocation'];
      //   if (visit_location) {
      //     visit = visit_location;
      //   }
      //   let wsSuccess = false;
      //   wsSuccess = window['Echo'].connector.pusher.channels.channels[
      //     `private-${cname}`
      //   ].trigger('client-visit', {
      //     U: localStorage.getItem('globe.user-id'),
      //     L: visit,
      //   });
      //   if (!wsSuccess) {
      //     this.analyticsDataService.pushActivity({
      //       L: visit,
      //       _token: document
      //         .querySelector('meta[name="csrf"]')
      //         .getAttribute('content'),
      //     });
      //   }
      // };

      window['clientEvent'] = (category, action) => {
        let wsSuccess = false;
        wsSuccess = window['Echo'].connector.pusher.channels.channels[
          // `private-${cname}`
          `${cname}`
        ].trigger('client-event', {
          U: localStorage.getItem('globe.user-id'),
          L: category,
          A: action,
        });
        if (!wsSuccess) {
          this.analyticsDataService
            .pushEvent({
              L: category,
              A: action,
              _token: document
                .querySelector('meta[name="csrf"]')
                .getAttribute('content'),
            })
            .subscribe((e) => {
              // console.log(e);
            });
        }
      };
    }
  }
}
