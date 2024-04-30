import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2003',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  erpLogin: "https://*.microtecdev.com:2050/erp/login",  
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
    window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email offline_access bo',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://intmicrotec.neat-url.com:2030',
    ClientId: 'BussinessOwner',
    SecretKey: 'secretkey',
  },
  ApiKey:"3bb564df-0f24-4ea6-82c1-d99f368cac8a",
  BusinessOwnerUrl: 'http://localhost:2003',
};
