export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    authority: 'https://localhost:7092',
    redirectUrl: window.location.origin + '/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/logout-redirect',
    clientId: 'ERP',
    scope: 'openid profile ',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
