export class EditJournalEntryLine {
    id: number;
    accountId: number;
    lineDescription?: string;
    debitAmount: number;
    creditAmount: number;
    currencyRate: number;
    currencyId: number;
  }