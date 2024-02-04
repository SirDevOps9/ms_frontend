export const environment = {
  production: true,
  baseUrl: 'https://192.168.100.191:9001',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://192.168.100.191:8085',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri:
      window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'microtecadminfrontend',
    scope: 'openid profile',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
