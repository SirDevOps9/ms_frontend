import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://api.microtecstage.com/business-owners-apis',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'depricated',
  erpLogin: 'https://*.microtecstage.com/erp/login',
  AuthConfiguration: {
    authority: 'https://auth.microtecstage.com',
    clientId: 'microtecadminfrontend',
    logoutRedirectUri: window.location.origin + '/bussiness-owners/logout-redirect',
    redirectUrl: window.location.origin + '/bussiness-owners/login-redirect',
    scopes: 'bo',
    state: '',
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://api.microtecstage.com/attachments-apis',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'https://api.microtecstage.com/business-owners-apis',
  state: 'noredirect',
};
