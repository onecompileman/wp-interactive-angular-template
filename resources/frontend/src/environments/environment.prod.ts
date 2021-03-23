export const environment = {
  production: true,
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
  }
};
