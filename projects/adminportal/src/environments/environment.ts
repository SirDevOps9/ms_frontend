export const environment = {
  production: true,
  baseUrl: 'https://localhost:44328',
  openIdConfig: {
    authority: 'http://192.168.100.191:8080',
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
