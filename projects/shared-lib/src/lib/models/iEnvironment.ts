export interface IEnvironment {
  production: boolean;
  baseUrl: string;
  Version: string;
  ClientId: string;
  Platform: string;
  photoBaseUrl: string;
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
  AttachmentServiceConfig: {
    AttachmentServiceUrl: string;
    ClientId: string;
    SecretKey: string;
  };
  ApiKey: string;
}
