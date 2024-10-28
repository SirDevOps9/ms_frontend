import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2008',
  Version: 'V1',
  ClientId: 'Apps-Inventory',
  Platform: 'Web',
  AuthConfiguration: {
    authority: 'https://intmicrotec.neat-url.com:2050',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/inventory/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://intmicrotec.neat-url.com:2030',
    ClientId: 'inventory',
    SecretKey: 'secretkey',
  },
  photoBaseUrl: '',
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://intmicrotec.neat-url.com:2003',
  state: window.location.origin + '/inventory/',
};
