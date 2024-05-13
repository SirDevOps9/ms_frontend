import { Actions } from './actions';

export interface PermissionTreeNode {
  UserLicenseId: number;
  SubDomainId: number;
  License: string;
  LicenseId: number;
  App: string;
  AppId: number;
  Service: string;
  ServiceId: number;
  Actions: Actions[];
}
