import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/business-owners-apis',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'depricated',
  erpLogin: 'https://*.microtec-auth.uksouth.cloudapp.azure.com/erp/login',
  AuthConfiguration: {
    authority: 'http://microtec-apis.uksouth.cloudapp.azure.com:2050',
    clientId: 'microtecadminfrontend',
    logoutRedirectUri: window.location.origin + '/bussiness-owners/logout-redirect',
    redirectUrl: window.location.origin + '/bussiness-owners/login-redirect',
    scopes: 'bo',
    state: '',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://10.0.0.4:2030',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://microtec-apis.uksouth.cloudapp.azure.com/business-owners-apis',
  state: 'noredirect',
};

