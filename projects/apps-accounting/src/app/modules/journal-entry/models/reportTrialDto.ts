export class reportTrialDto {
    accountId: number;
    accountCode: string;
    accountName: string;
    accountNature: string;
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