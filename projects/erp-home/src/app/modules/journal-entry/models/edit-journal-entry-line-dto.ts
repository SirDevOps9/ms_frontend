export class EditJournalEntryLine {
    id: number;
    accountId: number;
    lineDescription?: string;
    debitAmount: number;
    creditAmount: number;
    currency: number;
    currencyId: number;
    currencyRate:number
  }