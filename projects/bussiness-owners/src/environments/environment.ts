import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2003',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  erpLogin: 'https://*.microtecdev.com:2050/erp/login',
  AuthConfiguration: {
    authority: 'https://intmicrotec.neat-url.com:2050',
    clientId: 'microtecadminfrontend',
    logoutRedirectUri: window.location.origin + '/bussiness-owners/logout-redirect',
    redirectUrl: window.location.origin + '/bussiness-owners/login-redirect',
    scopes: 'bo',
    state: '',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://intmicrotec.neat-url.com:2030',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://intmicrotec.neat-url.com:2003',
  state: 'noredirect',
};
