export interface IEnvironment {
  production: boolean;
  baseUrl: string;
  Version: string;
  ClientId: string;
  Platform: string;
  photoBaseUrl: string;
  erpLogin?: string;
  AuthConfiguration?: {
    authority: string;
    redirectUrl: string;
    logoutRedirectUri: string;
    clientId: string;
    scopes: string;
    state: string;
  };
  AttachmentServiceConfig: {
    AttachmentServiceUrl: string;
    ClientId: string;
    SecretKey: string;
  };
  ApiKey: string;
  BusinessOwnerUrl: string;
  state?: string;
}
