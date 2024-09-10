export interface treasuryStatementDto {
    openingBalanceDebit: string;
    openingBalanceCredit: string;
    openingBalanceBalance: string;
    totalDebit: string;
    totalCredit: string;
    totalBalance: string;
    transactions: TreasuryStatmentTransactionDto[];
}


export interface TreasuryStatmentTransactionDto {
    date: string;
    paymentCode: string;
    paymentName: string;
    debit: number;
    credit: number;
    balance: number;
    paymentMethodName: string;
    sourceCode: string;
    journalCode: string;
    paidByDetails: string;
    linkedGLAccount: string;
    headerDescription: string;
    lineDescription: string;
    journalId:number;
    paymentOutHeaderId:number;
    paymentInHeaderId:number;
}