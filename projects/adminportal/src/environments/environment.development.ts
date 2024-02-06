export const environment = {
  production: true,
  baseUrl: 'https://localhost:7265',
  Version: 'V1',
  ClientId: 'AdminPortal',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://192.168.100.191:2000',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/adminportal/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile ',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
