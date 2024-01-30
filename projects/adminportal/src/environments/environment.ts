export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    authority: 'https://localhost:7092',
    redirectUrl: window.location.origin + '/adminportal/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/adminportal/logout-redirect',
    clientId: 'ERPBackend',
    scope: 'openid profile ',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
