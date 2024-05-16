import { AccountNature } from "./accountNature";

export interface AddAccountDto {
  nameAr: string;
  nameEn: string;
  levelId: number;
  accountCode:string;
  parentId:number;
  parentAccountCode:string
  natureId:AccountNature;
  hasNoChild: boolean;
  accountTypeId : number;
  accountSectionId: number;
  currencyId : number;
  tags : number[];
  periodicActive: boolean;
  periodicActiveFrom : Date;
  periodicActiveTo : Date;
}