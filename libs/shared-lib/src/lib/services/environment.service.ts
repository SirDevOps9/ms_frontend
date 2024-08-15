import { Injectable } from '@angular/core';
import { IEnvironment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentService implements IEnvironment {
  constructor() {}
  BusinessOwnerUrl: string;
  AttachmentServiceConfig: {
    AttachmentServiceUrl: string;
    ClientId: string;
    SecretKey: string;
  };
  production: boolean;
  baseUrl: string;
  Version: string;
  ClientId: string;
  Platform: string;
  photoBaseUrl: string;
  erpLogin?: string | undefined;
  AuthConfiguration?: {
    authority: string;
    redirectUrl: string;
    logoutRedirectUri: string;
    clientId: string;
    scopes: string;
    state: string;
  };
  ApiKey: string;
  state?: string;
}
