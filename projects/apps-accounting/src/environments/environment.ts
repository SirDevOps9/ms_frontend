import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2003',
  Version: 'V1',
  ClientId: 'Apps-Accounting',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
    redirectUrl: window.location.origin + '/accounting/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/accounting/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email offline_access tenants',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
