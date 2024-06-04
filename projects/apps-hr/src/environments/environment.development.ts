import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2005',
  Version: 'V1',
  ClientId: 'Erp.Hr',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  openIdConfig: {
    authority: 'http://localhost:44310',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    clientId: 'microtec_erp_frontend',
    scope: 'openid profile email offline_access subdomain',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:2030',
    ClientId: 'Erp.Hr',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:2003',
  state: window.location.origin + '/hr/',
};
