import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2003',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  erpLogin: 'https://*.localhost.com:4400/erp/login',
  AuthConfiguration: {
    authority: 'https://localhost:7116',
    clientId: 'microtecadminfrontend',
    logoutRedirectUri: window.location.origin + '/bussiness-owners/logout-redirect',
    redirectUrl: window.location.origin + '/bussiness-owners/login-redirect',
    scopes: 'bo',
    state: '',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:2030',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:2003',
  state: 'noredirect',
};
