export interface JournalEntryLineViewDto {
  id: number;
  accountCode?: string;
  accountName?: string;
  lineDescription?: string;
  debitAmount: number;
  creditAmount: number;
  currencyRate: number;
  debitAmountLocal: number;
  creditAmountLocal: number;
  currency?: string;
}