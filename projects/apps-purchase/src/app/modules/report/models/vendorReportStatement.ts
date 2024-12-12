export interface GetVendorStatementReportDto {
  vendorStatements: VendorStatementDto[];
  openingBalance?: VendorStatementDto;
  totalDebit: number;
  totalCredit: number;
  totalDebitLocal: number;
  totalCreditLocal: number;
  totalBalance: number;
  totalBalanceLocal: number;
}

export interface VendorStatementDto {
  transactionCode?: string;
  transactionDate: Date;
  transactionName?: string;
  journalId?: number;
  journalCode?: string;
  accountNature: string;
  credit: number;
  debit: number;
  balance: number;
  rate: number;
  creditLocal: number;
  debitLocal: number;
  balanceLocal: number;
}
