import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2003',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2020',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email offline_access tenants',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:2030',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
};
