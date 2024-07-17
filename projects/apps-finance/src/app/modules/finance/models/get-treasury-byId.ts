export interface GetTreasuryDtoById {
    id: number
    code: string
    name: string
    currencyId: number
    currencyName: string
    accountId: number
    accountName: string
    openingBalance: number
    currentBalance: number
    branches: any[]
}
  