export interface treasuryStatementDto {
    openingBalanceDebit: number;
    openingBalanceCredit: number;
    openingBalanceBalance: number;
    totalDebit: number;
    totalCredit: number;
    totalBalance: number;
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