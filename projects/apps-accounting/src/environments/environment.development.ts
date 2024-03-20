import { IEnvironment } from "shared-lib";

export const environment : IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2003',
  Version: 'V1',
  ClientId: 'Apps-Accounting',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2020',
    redirectUrl: window.location.origin + '/accounting/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/accounting/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email offline_access tenants',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig:{
    AttachmentServiceUrl :"https://localhost:2030",
    ClientId:"Accounting",
    SecretKey:"secretkey",
  }
};
