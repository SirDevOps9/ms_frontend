import { BankAccountStatementLinesDto } from './bank-account-statement-lines-dto';

export interface BankAccountStatementDto {
  totalDebit: number;
  totalCredit: number;
  totalBalance: number;
  openingBalance: BankAccountStatementLinesDto;
  transactions: BankAccountStatementLinesDto[];
}
