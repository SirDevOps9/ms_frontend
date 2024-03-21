import { Injectable } from '@angular/core';
import { IEnvironment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  constructor() {}
  AttachmentServiceConfig: { AttachmentServiceUrl: string; ClientId: string; SecretKey: string; };
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
  ApiKey: string;
}
