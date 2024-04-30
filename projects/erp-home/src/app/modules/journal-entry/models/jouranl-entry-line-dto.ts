export interface JournalEntryLineDto {
    id: number;
    accountId: number;

    //accountCode?: string;
    accountName?: string;
    lineDescription?: string;
    debitAmount: number;
    creditAmount: number;
    currencyId: number;
    debitAmountLocal: number;
    creditAmountLocal: number;
    currency?: string;
    currencyRate:number

  }
  