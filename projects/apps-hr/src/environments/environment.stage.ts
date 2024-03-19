import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'https://localhost:44328',
  Version: 'V1',
  ClientId: 'Apps-HR',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://dev-q00lf3jdcvq53wkj.us.auth0.com',
    redirectUrl: window.location.origin + '/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/logout-redirect',
    clientId: 'ayVhfTYMw6PzuY1ukj2CoiIi8VgbIcYk',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://localhost:2030',
    ClientId: 'hr',
    SecretKey: 'secretkey',
  },
  photoBaseUrl: ''
};
