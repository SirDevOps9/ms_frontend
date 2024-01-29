export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    // authority: 'http://192.168.120.98',
    authority: 'https://localhost:7092',
   // authority: ' http://192.168.120.98:8080',
   redirectUrl: window.location.origin + '/generalsettings/login-redirect',
   postLogoutRedirectUri: window.location.origin + '/generalsettings/logout-redirect',
    clientId: 'ERP',
    scope: 'openid profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
