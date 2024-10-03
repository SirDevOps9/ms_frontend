import { AccountNature } from './accountNature';

export interface AccountDto {
  id: number;
  name: string;
  accountCode?: string;
  levelNumber: number;
  mainType?: string;
  natureId: AccountNature;
  AccountTypeName: string;
  accountSectionName: string;
  currencyId?: number;
  costCenterConfig: string;
  isActive:boolean;
}
