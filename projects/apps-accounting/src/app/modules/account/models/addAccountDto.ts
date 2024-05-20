import { AccountNature } from "./accountNature";

export interface AddAccountDto {
  nameAr: string;
  nameEn: string;
  parentId:number;
  natureId:number;
  hasNoChild: boolean;
  accountTypeId : number;
  accountSectionId: number;
  currencyId : number;
  tags : number[];
  periodicActive: boolean;
  periodicActiveFrom : Date;
  periodicActiveTo : Date;
}