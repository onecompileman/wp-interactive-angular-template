// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
    appPrefix: '',
    talkJs: {
        appId: 'tkcoPA06',
        secretKey: 'sk_test_KgCO7bGedkypkQ15rwoJnqPP',
        userIdPrefix: 'app-prod-talk'
    },
    api: {
        endpoint: 'http://localhost:8000',
    },
    pusher: {
        id: 'waveplay',
        key: 'interactive',
        secret: 'local',
        cluster: 'asia',
        port: 6003,
        scheme: 'http',
        // scheme: 'https',
        host: 'localhost',
        // host: '',
    },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
