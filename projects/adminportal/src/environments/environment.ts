import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2007',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/adminportal/logout-redirect',
    clientId: 'microtec_admin_portal',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://intmicrotec.neat-url.com:2030',
    ClientId: 'AdminPortal',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://intmicrotec.neat-url.com:2003',
  state: 'noredirect',
};
