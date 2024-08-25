import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/admin-portal-apis',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  photoBaseUrl: '',
  AuthConfiguration: {
    authority: 'http://microtec-apis.uksouth.cloudapp.azure.com:2050',
    clientId: 'microtec_admin_portal',
    logoutRedirectUri: window.location.origin + '/admin-portal/logout-redirect',
    redirectUrl: window.location.origin + '/admin-portal/login-redirect',
    scopes: 'bo',
    state: '',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/attachments-apis',
    ClientId: 'AdminPortal',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/business-owners-apis',
  state: 'noredirect',
};
