export const environment = {
  production: true,
  baseUrl: 'https://localhost:7265',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://192.168.100.191:2000',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile email',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
