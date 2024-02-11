export const environment = {
  production: true,
  baseUrl: 'https://localhost:44360',
  openIdConfig: {
    authority: 'https://intmicrotec.neat-url.com:2010',
   redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
   postLogoutRedirectUri: window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
