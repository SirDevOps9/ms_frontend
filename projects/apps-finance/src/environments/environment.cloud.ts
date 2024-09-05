import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://api.microtecstage.com/erp-apis',
  Version: 'V1',
  ClientId: 'Apps-Finance',
  Platform: 'Web',
  photoBaseUrl: '',
  AuthConfiguration: {
    authority: 'https://auth.microtecstage.com',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/finance/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://api.microtecstage.com/attachments-apis',
    ClientId: 'Finance',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://api.microtecstage.com/business-owners-apis',
  state: window.location.origin + '/finance/',
};
