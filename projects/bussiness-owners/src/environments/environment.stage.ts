import { IEnvironment } from "shared-lib";

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'https://localhost:44328',
  Version: 'V1',
  ClientId: 'BussinessOwner',
  Platform: 'Web',
  openIdConfig: {
    authority: 'https://dev-w4w4mc6y1qyvaa5b.us.auth0.com',
    redirectUrl: window.location.origin + '/bussinessowners/login-redirect',
    postLogoutRedirectUri: window.location.origin + '/bussinessowners/logout-redirect',
    clientId: 'C0KpaoUvQPhiRr9VkZjUUrtJgcOP5BoA',
    scope: 'openid profile email offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
