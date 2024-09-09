export interface BankAccountStatementLinesDto {
    date: Date;
    paymentCode: string;
    paymentName: string;
    debit: number;
    credit: number;
    balance: number;
    paymentMethodName: string;
    sourceCode: string;
    journalCode: string;
    paidByDetailsName: string;
    accountName: string;
    headerDescription: string;
    lineDescription: string;
  }