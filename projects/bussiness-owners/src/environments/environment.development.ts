export const environment = {
  production: true,
  baseUrl: 'https://localhost:7265',
  openIdConfig: {
    authority: 'http://192.168.100.191:8080',
   redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
   postLogoutRedirectUri: window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
