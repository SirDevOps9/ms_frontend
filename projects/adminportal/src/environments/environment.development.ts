export const environment = {
  production: true,
  baseUrl: 'https://localhost:7265',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2003',
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
