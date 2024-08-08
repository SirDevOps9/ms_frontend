export interface bankByID {
    id: number
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
    id: number
    accountNumber: string
    bankId: number
    glAccountId: number,
    glAccountName: string
    glAccountCode: string
    iban: string
    currencyId: number
    currentBalance: number
    openingBalance: number
    userPermission: any[]
    branches: string[]
  }