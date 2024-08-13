
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
}
export enum AccountNature {
  Debit = 1,
  Credit = 2,
}
