export class reportTrialDto {
    accountId: number;
    accountCode: string;
    accountName: string;
    openingBalance: {
      debit: number,
      credit: number
    };
    transactionBalance: {
      debit: number,
      credit: number
    };
    endingBalance: {
      debit: number,
      credit: number
    }
  }