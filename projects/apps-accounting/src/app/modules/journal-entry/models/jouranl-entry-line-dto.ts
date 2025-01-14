import { costCenters } from './costCenters';

export interface JournalEntryLineDto {
  id: number;
  accountId: number;
  accountCode?: string;
  accountName?: string;
  lineDescription?: string;
  debitAmount: number;
  creditAmount: number;
  debitAmountLocal: number;
  creditAmountLocal: number;
  currency?: string;
  currencyId: number;
  currencyRate: number;
  costCenters: costCenters[];
  costCenterConfig: string;
}
