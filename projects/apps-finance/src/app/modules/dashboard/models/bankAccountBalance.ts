interface BankAccount {
  accountNumber: number | string;
  bankName: string;
  currentBalance: number;
}

export interface BankAccountsBalance {
  totalBalance: number;
  accounts: BankAccount[];
}
