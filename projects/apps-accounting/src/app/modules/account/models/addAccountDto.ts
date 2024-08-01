import { AccountNature } from "./accountNature";

export interface AddAccountDto {
  name: string;
  parentId:number;
  natureId:number;
  hasNoChild: boolean;
  accountTypeId : number;
  accountSectionId: number;
  currencyId : number;
  tags : number[];
  Companies : string[];
  AccountActivation: string;
  periodicActiveFrom : Date;
  periodicActiveTo : Date;
}