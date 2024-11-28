import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2005',
  Version: 'V1',
  ClientId: 'Erp.Finance',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  AuthConfiguration: {
    authority: 'http://localhost:5001/auth-apis',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/finance/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://localhost:5001/attachments-apis',
    ClientId: 'Erp.Finance',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:5001/business-owners-apis',
  state: window.location.origin + '/finance/',
};
