export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    authority: 'https://localhost:7092',
    redirectUrl: window.location.origin + '/generalsettings/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/generalsettings/logout-redirect',
    clientId: 'ERP',
    scope: 'openid profile ',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
