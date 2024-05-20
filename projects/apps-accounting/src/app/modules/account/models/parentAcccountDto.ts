import { AccountNature } from "./accountNature";

export interface parentAccountDto {
  id: number;
  nameAr: string;
  nameEn: string;
  accountCode?: string;
  levelId?:number;
  natureId:AccountNature;
  accountSectionId:number;
}
