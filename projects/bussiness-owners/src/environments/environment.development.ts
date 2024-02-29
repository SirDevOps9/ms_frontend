import { IEnvironment } from "shared-lib";

export const environment : IEnvironment = {
  production: false,
  baseUrl: 'http://localhost:2003',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2020',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email offline_access tenants',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
