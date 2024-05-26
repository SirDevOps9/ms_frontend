import { AccountNature } from './accountNature';

export interface parentAccountDto {
  id: number;
  name: string;
  accountCode?: string;
  levelId?: number;
  natureId: AccountNature;
  accountSectionId: number;
  accountSectionName: string;
  accountNature: string;
}
