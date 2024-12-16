import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2005',
  Version: 'V1',
  ClientId: 'Erp',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  AuthConfiguration: {
    authority: 'https://localhost:7116',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/erp/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:5001/attachments-apis',
    ClientId: 'Erp',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:5001/business-owners-apis',
  state: window.location.origin + '/erp/',
};
