import { Actions } from '.';

export interface PermissionTreeNode {
  UserLicenseId: number;
  SubDomainId: string;
  License: string;
  LicenseId: number;
  App: string;
  AppId: number;
  Service: string;
  ServiceId: number;
  Actions: Actions[];
}
