export interface Account {
  accountName: string;
  accountTypeId: number;
  accountTypeName: string;
  balance: number;
  accountId: number | string;
}

export interface AccountsData {
  accounts: Account[];
  totalBankBalance: number;
  totalCashBalance: number;
}
