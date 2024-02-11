export const environment = {
  production: true,
  baseUrl: 'https://intmicrotec.neat-url.com:2003',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
