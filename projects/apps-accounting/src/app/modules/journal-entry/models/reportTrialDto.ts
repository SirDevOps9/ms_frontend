export class reportTrialDto {
    accountId: number;
    accountCode: string;
    accountName: string;
    openingBalance: {
      debit: any,
      credit: any
    };
    transactionBalance: {
      debit: any,
      credit: any
    };
    endingBalance: {
      debit: any,
      credit: any
    }
  }