import { IEnvironment } from 'shared-lib';

export const environment: IEnvironment = {
  production: false,
  baseUrl: 'https://localhost:44328',
  Version: 'V1',
  ClientId: 'Apps-Accounting',
  Platform: 'Web',
  AttachmentServiceConfig: {
    AttachmentServiceUrl: 'https://localhost:2030',
    ClientId: 'Accounting',
    SecretKey: 'secretkey',
  },
  photoBaseUrl: '',
  ApiKey: '3bb564df-0f24-4ea6-82c1-d99f368cac8a',
  BusinessOwnerUrl: 'http://localhost:2003',
};
