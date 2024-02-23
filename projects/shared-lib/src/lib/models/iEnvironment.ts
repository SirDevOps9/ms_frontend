export interface IEnvironment {
  production: boolean;
  baseUrl: string;
  Version: string;
  ClientId: string;
  Platform: string;
  openIdConfig: {
    authority: string;
    redirectUrl: string;
    postLogoutRedirectUri: string;
    clientId: string;
    scope: string;
    responseType: string;
    silentRenew: true;
    useRefreshToken: true;
  };
}
