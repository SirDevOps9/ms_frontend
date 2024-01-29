export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    authority: 'https://localhost:7092',
   redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
   postLogoutRedirectUri: window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'ERPBackend',
    scope: 'openid profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
