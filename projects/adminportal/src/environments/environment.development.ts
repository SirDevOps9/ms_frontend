import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'http://localhost:2007',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2020',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/adminportal/logout-redirect',
    clientId: 'microtec_admin_portal',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://localhost:2030',
    ClientId: 'AdminPortal',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:2003',
  state: 'noredirect',
};
