import { AccountNature } from "./accountNature";

export interface AccountDto {
  id: number;
  nameAr: string;
  nameEn: string;
  accountCode?: string;
  mainType?: string;
  natureId:AccountNature;
  AccountTypeName:string;
  accountSectionName:string;
  name ? :string

}
