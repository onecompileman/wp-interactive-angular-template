import { Injectable } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AssetsDataService {

    constructor(
        private restangular: Restangular
    ) {}

    getAll(): Observable<any> {
        // return this.restangular
        //     .one('api')
        //     .one('v2')
        //     .one('event')
        //     .one('1')
        //     .one('assets')
        //     .get();

        // TODO: TO BE REMOVED (DUMMY DATA)
        return of({
          data:[
            {
                "id":12,
                "order":null,
                "start_at":null,
                "end_at":null,
                "type":"PROGRAM SCHEDULE",
                "category":"IFRAME",
                "subcategory":null,
                "title":"Emperador Coffee Brandy T-Shirt (Black)",
                "short_title":null,
                "subtitle":null,
                "description":null,
                "description_2":null,
                "description_3":null,
                "poster_url":null,
                "audio_url":null,
                "image_url":null,
                "image_thumbnail_url":null,
                "video_thumbnail_url":null,
                "video_url": "https://player.vimeo.com/video/87110435",
                "video_replay_url":null,
                "chat_url":null,
                "attachments":{
                    "asset_url": "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
                },
                "links":null,
                "downloadable":false,
                "viewable":true,
                "point":{
                    "id":13,
                    "api_code":"61b07790be836",
                    "max_usage":1,
                    "max_usage_overall":-1,
                    "label":"Emperador Coffee Brandy T-Shirt (Black)",
                    "description":"Emperador Coffee Brandy T-Shirt (Black)",
                    "value":0,
                    "hit_criteria":1,
                    "category":null,
                    "start_valid_date":"1992-11-30 00:00:00",
                    "end_valid_date":"3000-01-01 00:00:00",
                    "roles":null,
                    "created_at":"2021-12-08T09:14:56.000000Z",
                    "updated_at":"2021-12-08T09:14:56.000000Z",
                    "pointable_type":"App\\Program",
                    "pointable_id":12
                }
            },
            {
                "id":17,
                "order":null,
                "start_at":null,
                "end_at":null,
                "type":"FEEDBACK FORM",
                "category":"IFRAME",
                "subcategory":null,
                "title":"Video Right 2",
                "short_title":null,
                "subtitle":null,
                "description":null,
                "description_2":null,
                "description_3":null,
                "poster_url":null,
                "audio_url":null,
                "image_url":null,
                "image_thumbnail_url":null,
                "video_thumbnail_url":null,
                "video_url": "https://docs.google.com/forms/d/e/1FAIpQLSeI8_vYyaJgM7SJM4Y9AWfLq-tglWZh6yt7bEXEOJr_L-hV1A/viewform?formkey=dGx0b1ZrTnoyZDgtYXItMWVBdVlQQWc6MQ",
                "video_replay_url":null,
                "chat_url":null,
                "attachments": null,
                "links":null,
                "downloadable":false,
                "viewable":true,
                "point":{
                    "id":13,
                    "api_code":"61b07790be836",
                    "max_usage":1,
                    "max_usage_overall":-1,
                    "label":"Emperador Coffee Brandy T-Shirt (Black)",
                    "description":"Emperador Coffee Brandy T-Shirt (Black)",
                    "value":0,
                    "hit_criteria":1,
                    "category":null,
                    "start_valid_date":"1992-11-30 00:00:00",
                    "end_valid_date":"3000-01-01 00:00:00",
                    "roles":null,
                    "created_at":"2021-12-08T09:14:56.000000Z",
                    "updated_at":"2021-12-08T09:14:56.000000Z",
                    "pointable_type":"App\\Program",
                    "pointable_id":12
                }
            }
          ]
        });
    }
}
