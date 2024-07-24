import { AccountNature } from './accountNature';

export interface AccountDto {
  id: number;
  name: string;
  accountCode?: string;
  mainType?: string;
  natureId: AccountNature;
  AccountTypeName: string;
  accountSectionName: string;
  currencyId?: number;
  costCenterConfig : string
}
