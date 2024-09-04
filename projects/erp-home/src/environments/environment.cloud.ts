import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/erp-apis',
  Version: 'V1',
  ClientId: 'Erp',
  Platform: 'Web',
  photoBaseUrl: '',
  AuthConfiguration: {
    authority: 'http://microtec-apis.uksouth.cloudapp.azure.com:2050',
    clientId: 'microtec_erp_frontend',
    redirectUrl: window.location.origin + '/erp/login-redirect',
    logoutRedirectUri: window.location.origin + '/erp/logout-redirect',
    scopes: 'subdomain',
    state: window.location.origin + '/erp/',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/attachments-apis',
    ClientId: 'Erp',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/business-owners-apis',
  state: window.location.origin + '/erp/',
};
