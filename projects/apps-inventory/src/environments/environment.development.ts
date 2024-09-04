import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2008',
  Version: 'V1',
  ClientId: 'Erp.Inventory',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  AuthConfiguration: {
    authority: 'https://localhost:7116',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/inventory/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:2030',
    ClientId: 'Erp.Inventory',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:2003',
  state: window.location.origin + '/inventory/',
};
