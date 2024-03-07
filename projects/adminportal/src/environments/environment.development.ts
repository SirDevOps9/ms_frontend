import { IEnvironment } from "shared-lib";

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://localhost:7265',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  photoBaseUrl: 'https://intmicrotec.neat-url.com:2022',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2020',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/adminportal/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
