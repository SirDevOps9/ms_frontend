import { IEnvironment } from "shared-lib";

export const environment :IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2003',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2002',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/adminportal/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile offline_access tenants',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  AttachmentServiceConfig:{
    AttachmentServiceUrl :"https://localhost:2030",
    ClientId:"AdminPortal",
    SecretKey:"secretkey",
  }
};
