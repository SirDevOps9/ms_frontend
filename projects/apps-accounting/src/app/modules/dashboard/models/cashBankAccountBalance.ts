export interface Account {
  accountName: string;
  accountTypeId: number;
  accountTypeName: string;
  balance: number;
}

export interface AccountsData {
  accounts: Account[];
  totalBankBalance: number;
  totalCashBalance: number;
}
