export interface AddBankDto {
    code: string
    shortName: string
    contactName: string
    phone: string
    name: string
    bankAddress: string
    bankEmail: string
    fax: string
    bankAccounts: BankAccount[]
  }
  
  export interface BankAccount {
    accountNumber: string
    glAccountId: number
    iban: string
    currencyId: number
    openingBalance: number
    userPermission: string[]
    branches: string[]
  }
  