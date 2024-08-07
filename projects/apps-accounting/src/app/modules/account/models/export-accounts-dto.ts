import { AccountNature } from "./accountNature";

export interface ExportAccountsDto {
    id: number;
    name: string;
    accountCode?: string;
    mainType?: string;
    natureId: AccountNature;
    AccountTypeName: string;
    accountSectionName: string; 
    costCenterConfig : string
  }
  